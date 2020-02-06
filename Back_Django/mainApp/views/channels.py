from django.contrib.auth.models import User
from rest_framework import status, authentication, permissions
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Channel
from ..serializers import ChannelSerializer


@permission_classes((permissions.IsAuthenticated,))
class Channels(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def get(request):
        channels = Channel.objects.filter(owner=request.user.id)
        serializer = ChannelSerializer(channels, many=True)
        return Response(serializer.data, status.HTTP_200_OK)

    @staticmethod
    def post(request):
        try:
            Channel.objects.get(channelId=request.data['channelId'])
        except Channel.DoesNotExist:
            channel = Channel.objects.create(owner=request.user, channelName=request.data['channelName'],
                                             channelId=request.data['channelId'], isPersonal=False,
                                             followersNum=0, followingsNum=0,
                                             postsNum=0, description=request.data['description'])
            channel.save()
            return Response('channel created', status=status.HTTP_201_CREATED)
        return Response('this channel id is taken before', status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def put(request):
        try:
            channel = Channel.objects.get(channelId=request.data['lastId'])
        except Channel.DoesNotExist:
            return Response('this channel Id doesnt exist', status=status.HTTP_400_BAD_REQUEST)
        if channel.owner.username != request.user.username:
            return Response("You Can't edit", status=status.HTTP_400_BAD_REQUEST)
        if 'channelName' in request.data:
            channel.channelName = request.data['channelName']
        if 'description' in request.data:
            channel.description = request.data['description']
        if 'block' in request.data:
            try:
                blocking_user = User.objects.get(username=request.data['block'])
                channel.blockedUsers.add(blocking_user)
            except User.DoesNotExist:
                return Response("Invalid Blocking Username", status=status.HTTP_400_BAD_REQUEST)
        if 'unblock' in request.data:
            try:
                unblocking_user = User.objects.get(username=request.data['block'])
                channel.blockedUsers.remove(unblocking_user)
            except User.DoesNotExist:
                return Response("Invalid Blocking Username", status=status.HTTP_400_BAD_REQUEST)
        channel.save()
        return Response(ChannelSerializer(channel, many=False).data, status=status.HTTP_202_ACCEPTED)
