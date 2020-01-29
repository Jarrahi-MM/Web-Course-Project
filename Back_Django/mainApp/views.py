from rest_framework import viewsets

from mainApp.models import ChannelInfo
from mainApp.serializers import ChannelSerializer


class ChannelViewSet(viewsets.ModelViewSet):
    queryset = ChannelInfo.objects.all()
    serializer_class = ChannelSerializer
