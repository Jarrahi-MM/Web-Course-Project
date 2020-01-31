from datetime import datetime

from rest_framework import status, authentication
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User

from ..models import Post, ChannelInfo, ProfileInfo
from ..serializers import ProfileSerializer


class Profiles(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def get(request, username):
        try:
            user = User.objects.get(username=username)
            profile = ProfileInfo.objects.get(user=user)
        except ProfileInfo.DoesNotExist:
            return Response('Invalid user', status=status.HTTP_400_BAD_REQUEST)
        return Response(ProfileSerializer(profile).data, status.HTTP_200_OK)

    @staticmethod
    def put(request, username):
        try:
            user = User.objects.get(username=username)
            profile = ProfileInfo.objects.get(user=user)
        except ProfileInfo.DoesNotExist:
            return Response('Invalid user', status=status.HTTP_400_BAD_REQUEST)
        if request.user.is_anonymous:
            return Response("get the hell out", status=status.HTTP_400_BAD_REQUEST)
        if request.user.username != username:
            return Response("You can't edit profile", status=status.HTTP_400_BAD_REQUEST)
        profile.city = request.data['city']
        profile.country = request.data['country']
        profile.phoneNum = request.data['phoneNum']
        profile.save()
        return Response('', status.HTTP_200_OK)

    @staticmethod
    def post(request, username):
        return Response('', status.HTTP_200_OK)

    @staticmethod
    def delete(request, username):
        return Response('', status.HTTP_200_OK)
