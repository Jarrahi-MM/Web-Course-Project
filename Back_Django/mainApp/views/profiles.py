from django.contrib.auth.models import User
from rest_framework import status, authentication, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from ..models import ProfileInfo
from ..serializers import ProfileSerializer


class Profiles(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def get(request, username):
        # try:
        #     user = User.objects.get(username=username)
        #     profile = ProfileInfo.objects.get(user=user)
        # except ProfileInfo.DoesNotExist:  # Todo:Negin Check
        #     return Response('Invalid user', status=status.HTTP_400_BAD_REQUEST)
        profile = get_object_or_404(ProfileInfo, user__username=username)
        return Response(ProfileSerializer(profile).data, status.HTTP_200_OK)

    @staticmethod
    def put(request, username):
        # try:
        #     user = User.objects.get(username=username)
        #     profile = ProfileInfo.objects.get(user=user)
        # except ProfileInfo.DoesNotExist:  # Todo:Negin Check
        #     return Response('Invalid user', status=status.HTTP_400_BAD_REQUEST)
        profile = get_object_or_404(ProfileInfo, user__username=username)
        if request.user.is_anonymous:
            return Response("get the hell out", status=status.HTTP_400_BAD_REQUEST)  # Todo:Negin Check
        if request.user.username != username:
            return Response("You can't edit profile", status=status.HTTP_400_BAD_REQUEST)
        profile.city = request.data['city']
        profile.country = request.data['country']
        profile.phoneNum = request.data['phoneNum']
        profile.save()
        return Response('', status.HTTP_200_OK)  # Todo:Negin Check

    @staticmethod
    def post(request, username):
        return Response('', status.HTTP_200_OK)  # Todo:Negin Check

    @staticmethod
    def delete(request, username):
        return Response('', status.HTTP_200_OK)  # Todo:Negin Check
