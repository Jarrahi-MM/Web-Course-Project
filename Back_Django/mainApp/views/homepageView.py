from django.contrib.auth.models import User
from django.db.models import Max, Min
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from datetime import datetime, timedelta
from django.utils import timezone

from ..models import Channel, Post
from ..serializers import HomepageViewSerializer
from ..constants import paginateBy, date_time_formatter


@api_view()
@permission_classes((permissions.IsAuthenticated,))
def homepage(request, tab_name):
    checkpoint = request.query_params.get('checkpoint')
    if checkpoint == 'null' or checkpoint is None:
        checkpoint = datetime.max
    else:
        checkpoint = datetime.strptime(request.query_params.get('checkpoint'), date_time_formatter)
    user = request.user

    if tab_name == 'FOLLOWED':
        post_list = Post.objects.filter(channel__in=user.followings.all())
        post_list = post_list.order_by('-creationDate')
    elif tab_name == 'HOTTEST':
        post_list = Post.objects.filter(creationDate__gt=timezone.now() - timedelta(weeks=1)).order_by('-likesNum',
                                                                                                       '-creationDate')
    elif tab_name == 'LATEST':
        post_list = Post.objects.order_by('-creationDate')
    elif tab_name == 'PARTICIPATED':
        temp_post_list = Post.objects.order_by('-creationDate')
        post_list = []
        for post in temp_post_list:
            if hasUserPaticipatedInPost(post, user):
                post_list.append(post.postNumber)
                if len(post_list) == paginateBy + 1:
                    break
        post_list = Post.objects.filter(postNumber__in=post_list).order_by('-creationDate')
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)  # never happens

    post_list = post_list.filter(creationDate__lt=checkpoint)
    if post_list.count() == 0:
        return Response(status=status.HTTP_204_NO_CONTENT)
    has_more_items = post_list.count() > paginateBy
    post_list = post_list[:paginateBy]
    new_checkpoint = post_list.aggregate(cp=Min('creationDate')).get('cp')

    post_list = post_list.all()
    new_checkpoint = datetime.strftime(new_checkpoint, date_time_formatter)

    data = {
        'postObjs': post_list,
        'checkpoint': new_checkpoint,
        'hasMoreItems': has_more_items
    }
    serializer = HomepageViewSerializer(data)
    return Response(serializer.data, status=status.HTTP_200_OK)


def hasUserPaticipatedInPost(post, user):
    if post.creator == user:
        return True
    return recurse_comments(post.firstComment, user)


def recurse_comments(comment, user):
    if comment.creator == user:
        return True
    for sub_comment in comment.subComments:
        if recurse_comments(sub_comment, user):
            return True
    return False
