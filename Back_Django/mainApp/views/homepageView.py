from django.contrib.auth.models import User
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from datetime import datetime, timedelta
from django.utils import timezone

from ..models import Channel, Post
from ..serializers import HomepageSerializer

paginateBy = 10


@api_view()
@permission_classes((permissions.IsAuthenticated,))
def homepage(request, tabName):
    checkpoint = request.data.get('checkpoint')
    if checkpoint is None:
        checkpoint = datetime.max
    user = request.user

    new_checkpoint = None
    has_more_items = None
    post_list = Post.objects.none()

    if tabName == 'FOLLOWED':
        for channel in user.followings.all():
            post_list.union(channel.posts.filter(creationDate__lt=checkpoint).all())
        post_list = post_list.order_by('-creationDate')
    elif tabName == 'HOTTEST':
        post_list = Post.objects.filter(creationDate__gt=timezone.now() - timedelta(weeks=1)).order_by('-likesNum')
    elif tabName == 'LATEST':
        post_list = Post.objects.order_by('-creationDate')
    elif tabName == 'PARTICIPATED':
        temp_post_list = Post.objects.order_by('-creationDate')
        post_list = []
        for post in temp_post_list:
            if hasUserPaticipatedInPost(post, user):
                post_list.append(post)
                if len(post_list) == paginateBy + 1:
                    break
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)  # never happens

    post_list = list(post_list)
    if len(post_list) > paginateBy:
        has_more_items = True
    post_list = post_list[paginateBy:]
    new_checkpoint = post_list[-1].creationDate

    data = {
        'postObjs': post_list,
        'checkpoint': new_checkpoint,
        'hasMoreItems': has_more_items
    }
    serializer = HomepageSerializer(data)
    return Response(serializer.data, status=status.HTTP_200_OK)


def hasUserPaticipatedInPost(post, user):
    if post.creator == user:
        return True
    return recurseComments(post.firstComment, user)


def recurseComments(comment, user):
    if comment.creator == user:
        return True
    # for sub_comment in comment.
