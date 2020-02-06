from django.contrib.auth.models import User
from rest_framework import status, authentication
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from ..models import ProfileInfo, Channel
from ..serializers import ProfileSerializer, ChannelSerializer


class Channels(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def get(request, channelId):
        if channelId == '':
            try:
                channels = Channel.objects.filter(owner=request.user.id)
            except Channel.DoesNotExist:
                return Response('Invalid channel', status=status.HTTP_400_BAD_REQUEST)

            serializer = ChannelSerializer(channels, many=True)
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            channel = get_object_or_404(Channel, channelId=channelId)
            return Response(ChannelSerializer(channel).data, status.HTTP_200_OK)

    @staticmethod
    def post(request, channelId):
        try:
            channel = Channel.objects.get(channelId=request.data['channelId'])
        except Channel.DoesNotExist:
            channel = Channel.objects.create(owner=request.user, channelName=request.data['channelName'],
                                             channelId=request.data['channelId'], isPersonal=False,
                                             followersNum=0, followingsNum=0,
                                             postsNum=0, description=request.data['description'])
            channel.save()
            return Response('channel created', status=status.HTTP_201_CREATED)
        return Response('this channel id is taken before', status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def put(request, channelId):
        try:
            channel = Channel.objects.get(channelId=channelId)
            channel.channelName = request.data['channelName']
            channel.description = request.data['description']
            channel.save()
        except Channel.DoesNotExist:
            return Response('this channel Id doesnt exist', status=status.HTTP_400_BAD_REQUEST)
        return Response('channel updated', status=status.HTTP_202_ACCEPTED)
