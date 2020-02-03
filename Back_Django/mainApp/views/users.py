from rest_framework import authentication, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User


class Users(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def put(request):
        username = request.user.username
        user = User.objects.get(username=username)
        user.first_name = (request.data['first_name'])
        user.last_name = (request.data['last_name'])
        user.email = (request.data['email'])
        user.save()
        return Response("user updated", status=status.HTTP_200_OK)
