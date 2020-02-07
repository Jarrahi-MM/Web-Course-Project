from django.shortcuts import get_object_or_404
from rest_framework import status, authentication
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import ProfileInfo, Channel
from ..serializers import ProfileSerializer


class Profiles(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def get(request, username):
        profile = get_object_or_404(ProfileInfo, user__username=username)
        return Response(ProfileSerializer(profile).data, status.HTTP_200_OK)

    @staticmethod
    def put(request, username):
        profile = get_object_or_404(ProfileInfo, user__username=username)
        if request.user.is_anonymous:
            return Response("not logged in", status=status.HTTP_400_BAD_REQUEST)
        if request.user.username != username:
            return Response("You can't edit profile", status=status.HTTP_400_BAD_REQUEST)
        if 'city' in request.data:
            profile.city = request.data['city']
        if 'country' in request.data:
            profile.country = request.data['country']
        if 'phoneNum' in request.data:
            profile.phoneNum = request.data['phoneNum']
        if 'follow' in request.data:
            try:
                channel = Channel.objects.get(channelId=request.data['follow'])
                if channel.blockedUsers.filter(username=username).count() > 0:
                    return Response("You are blocked", status=status.HTTP_400_BAD_REQUEST)
                if channel.followers.filter(username=username).count() > 0:
                    return Response("You already followed the channel", status=status.HTTP_400_BAD_REQUEST)
                print('---', channel.followers.filter(username=username).count())
                channel.followers.add(request.user)
                channel.followersNum += 1
                profile.followingsNum += 1
                channel.save()
            except Channel.DoesNotExist:
                return Response("Invalid Following Channel", status=status.HTTP_400_BAD_REQUEST)
        if 'unfollow' in request.data:
            try:
                channel = Channel.objects.get(channelId=request.data['unfollow'])
                if channel.followers.filter(username=username).count() == 0:
                    return Response("You didn't follow the channel", status=status.HTTP_400_BAD_REQUEST)
                channel.followers.remove(request.user)
                channel.followersNum -= 1
                profile.followingsNum -= 1
                channel.save()
            except Channel.DoesNotExist:
                return Response("Invalid unFollowing Channel", status=status.HTTP_400_BAD_REQUEST)
        profile.save()
        request.user.save()
        return Response(ProfileSerializer(profile).data, status.HTTP_200_OK)
