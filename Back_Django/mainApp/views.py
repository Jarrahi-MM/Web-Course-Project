from rest_framework import viewsets

from .models import ChannelInfo
from .serializers import ChannelSerializer


class ChannelViewSet(viewsets.ModelViewSet):
    queryset = ChannelInfo.objects.all()
    serializer_class = ChannelSerializer
