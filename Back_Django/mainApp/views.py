from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework import viewsets

from .models import ChannelInfo
from .models import ProfileInfo
from .serializers import ChannelSerializer
from .serializers import ProfileSerializer, UserSerializer


class ChannelViewSet(viewsets.ModelViewSet):
    queryset = ChannelInfo.objects.all()
    serializer_class = ChannelSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        return HttpResponse("Error")

    def list(self, request, *args, **kwargs):
        return HttpResponse("Error")

    def update(self, request, *args, **kwargs):
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
