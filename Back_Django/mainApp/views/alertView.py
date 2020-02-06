from datetime import datetime

from django.db.models import Min
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from ..constants import paginateBy, date_time_formatter
from ..models import Alert
from ..serializers import AlertViewSerializer


@api_view()
@permission_classes((permissions.IsAuthenticated,))
def alert_items(request):
    user = request.user
    checkpoint = request.query_params.get('checkpoint')
    if checkpoint == 'null' or checkpoint is None:
        checkpoint = datetime.max
    else:
        checkpoint = datetime.strptime(request.query_params.get('checkpoint'), date_time_formatter)

    alert_list = Alert.objects.filter(creation_date__lt=checkpoint, user=user) \
        .order_by('-creation_date')

    if alert_list.count() == 0:
        return Response(status=status.HTTP_204_NO_CONTENT)
    has_more_items = alert_list.count() > paginateBy
    alert_list = alert_list[:paginateBy]
    new_checkpoint = alert_list.aggregate(mc=Min('creation_date')).get('mc')
    new_checkpoint = datetime.strftime(new_checkpoint, date_time_formatter)

    serializer = AlertViewSerializer({
        'alerts': alert_list,
        'checkpoint': new_checkpoint,
        'hasMoreItems': has_more_items
    })
    res_data = serializer.data

    for alert in alert_list:
        alert.has_been_seen = True
        alert.save()

    return Response(data=res_data, status=status.HTTP_200_OK)


@api_view()
@permission_classes((permissions.IsAuthenticated,))
def unread_count(request):
    user = request.user
    count = Alert.objects.filter(user=user, has_been_seen=False).count()
    return Response(data=count, status=status.HTTP_200_OK)
