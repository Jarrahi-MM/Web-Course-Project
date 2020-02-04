from django.contrib.auth.models import User
from rest_framework import status, authentication
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import ProfileInfo, Channel
from ..serializers import ProfileSerializer, ChannelSerializer


class Channels(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def get(request):
        try:
            channels = Channel.objects.filter(owner=request.user.id)
        except Channel.DoesNotExist:
            return Response('Invalid channel', status=status.HTTP_400_BAD_REQUEST)

        serializer = ChannelSerializer(channels, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
