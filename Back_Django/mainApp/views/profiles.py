from django.contrib.auth.models import User
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
                following_channel = Channel.objects.get(channelId=request.data['follow'])
                if request.user in following_channel.blockedUsers:
                    return Response("You are blocked and can't follow ...", status=status.HTTP_400_BAD_REQUEST)
                request.user.followings.add(following_channel)
            except User.DoesNotExist:
                return Response("Invalid Following Channel", status=status.HTTP_400_BAD_REQUEST)
        if 'unfollow' in request.data:
            try:
                unfollowing_channel = Channel.objects.get(channelId=request.data['unfollow'])
                request.user.followings.remove(unfollowing_channel)
            except User.DoesNotExist:
                return Response("Invalid unFollowing Channel", status=status.HTTP_400_BAD_REQUEST)
        profile.save()
        return Response(ProfileSerializer(profile).data, status.HTTP_200_OK)
