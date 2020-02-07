from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from ..models import ProfileInfo
from ..serializers import ProfileSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        my_result = dict(serializer.data)
        my_result['token'] = Token.objects.get(user=User.objects.get(username=request.data['username']).id).key

        return Response(my_result, status=status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        return HttpResponse("Error")

    def list(self, request, *args, **kwargs):
        return HttpResponse("Error")

    def destroy(self, request, *args, **kwargs):
        return HttpResponse("Error")


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = ProfileInfo.objects.all()
    serializer_class = ProfileSerializer

    def destroy(self, request, *args, **kwargs):
        return HttpResponse("Error")

    def create(self, request, *args, **kwargs):
        return HttpResponse("Error")
