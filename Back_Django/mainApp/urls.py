from django.http import HttpResponse
from django.urls import path, include
from rest_framework import routers

from .views.UserView import ChannelViewSet, ProfileViewSet, UserViewSet
from .views.likes import LikesView
from .views.posts import Posts

router = routers.DefaultRouter()
router.register('channels', ChannelViewSet)
router.register('profile', ProfileViewSet)
router.register('register', UserViewSet)


def post_process(request, username, postNumber):
    print(request, "   ", username, postNumber)
    return HttpResponse(str(request.method) + "   " + username + str(postNumber))


urlpatterns = [
    path('', include(router.urls)),
    path('posts/<str:channelId>/<int:postNumber>', Posts.as_view()),
    path('posts/<str:channelId>', Posts.as_view(), kwargs={'postNumber': 0}),
    path('likes/<str:channelId>/<int:postNumber>/<int:value>', LikesView.as_view()),
]
