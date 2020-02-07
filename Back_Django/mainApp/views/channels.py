from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
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
            Channel.objects.get(channelId=request.data['channelId'])
        except Channel.DoesNotExist:
            channel = Channel.objects.create(owner=request.user, channelName=request.data['channelName'],
                                             channelId=request.data['channelId'], isPersonal=False,
                                             followersNum=0,
                                             postsNum=0, description=request.data['description'])
            channel.save()
            return Response('channel created', status=status.HTTP_201_CREATED)
        return Response('this channel id is taken before', status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def put(request, channelId):
        try:
            channel = Channel.objects.get(channelId=channelId)
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
                if channel.followers.filter(username=request.data['block']).count() == 1:
                    channel.followers.remove(blocking_user)
                    channel.followersNum -= 1
                    blocking_user.profile.followingsNum -= 1
                channel.blockedUsers.add(blocking_user)
                blocking_user.save()
            except User.DoesNotExist:
                return Response("Invalid Blocking Username", status=status.HTTP_400_BAD_REQUEST)
        if 'unblock' in request.data:
            try:
                unblocking_user = User.objects.get(username=request.data['unblock'])
                channel.blockedUsers.remove(unblocking_user)
            except User.DoesNotExist:
                return Response("Invalid Blocking Username", status=status.HTTP_400_BAD_REQUEST)
        if 'addToContributors' in request.data:
            try:
                add_contributor_user = User.objects.get(username=request.data['addToContributors'])
                channel.contributors.add(add_contributor_user)
            except User.DoesNotExist:
                return Response("Invalid addToContributors Username", status=status.HTTP_400_BAD_REQUEST)
        if 'removeFromContributors' in request.data:
            try:
                remove_contributor_user = User.objects.get(username=request.data['removeFromContributors'])
                channel.contributors.remove(remove_contributor_user)
            except User.DoesNotExist:
                return Response("Invalid removeFromContributors Username", status=status.HTTP_400_BAD_REQUEST)
        if 'removeFromFollowers' in request.data:
            try:
                remove_follower_user = User.objects.get(username=request.data['removeFromFollowers'])
                if channel.followers.filter(username=request.data['removeFromFollowers']).count() == 1:
                    channel.followers.remove(remove_follower_user)
                    channel.followersNum -= 1
                    remove_follower_user.profile.followingsNum -= 1
                    remove_follower_user.save()
            except User.DoesNotExist:
                return Response("Invalid removeFromFollowers Username", status=status.HTTP_400_BAD_REQUEST)
        channel.save()
        return Response(ChannelSerializer(channel, many=False).data, status=status.HTTP_202_ACCEPTED)
