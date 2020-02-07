from datetime import datetime

from django.db.models import Min
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from ..constants import paginateBy, date_time_formatter
from ..models import Post
from ..serializers import ChannelPostsViewSerializer


@api_view()
@permission_classes((permissions.IsAuthenticated,))
def channel_posts(request, channel_id):
    checkpoint = request.query_params.get('checkpoint')
    if checkpoint == 'null' or checkpoint is None:
        checkpoint = datetime.max
    else:
        checkpoint = datetime.strptime(checkpoint, date_time_formatter)

    post_list = Post.objects.filter(creationDate__lt=checkpoint, channel=channel_id) \
        .order_by('-creationDate')

    has_more_items = post_list.count() > paginateBy
    if post_list.count() > 0:
        post_list = post_list[:paginateBy]
        new_checkpoint = post_list.aggregate(mc=Min('creationDate')).get('mc')
        new_checkpoint = datetime.strftime(new_checkpoint, date_time_formatter)
    else:
        new_checkpoint = None

    serializer = ChannelPostsViewSerializer({
        'posts': post_list,
        'checkpoint': new_checkpoint,
        'hasMoreItems': has_more_items
    })

    return Response(data=serializer.data, status=status.HTTP_200_OK)
