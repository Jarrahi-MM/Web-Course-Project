from rest_framework import authentication, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User


class Users(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def put(request, username):
        user = User.objects.get(username=username)
        user.set_password(request.data['password'])
        return Response("pass updated", status=status.HTTP_200_OK)
