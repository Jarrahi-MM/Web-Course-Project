from rest_framework import viewsets

from Back_Django.mainApp.models import ChannelInfo
from Back_Django.mainApp.serializers import ChannelSerializer


class ChannelViewSet(viewsets.ModelViewSet):
    queryset = ChannelInfo.objects.all()
    serializer_class = ChannelSerializer
