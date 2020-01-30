from django.http import HttpResponse
from django.urls import path, include
from rest_framework import routers

from .views.UserView import ChannelViewSet, ProfileViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('channels', ChannelViewSet)
router.register('profile', ProfileViewSet)
router.register('register', UserViewSet)


def post_process(request, username, postNumber):
    print(request, "   ", username, postNumber)
    return HttpResponse(str(request.method) + "   " + username + str(postNumber))


urlpatterns = [
    path('', include(router.urls)),
    path('posts/<str:username>/<int:postNumber>', post_process)
]
