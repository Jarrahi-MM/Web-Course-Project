from django.urls import path, include
from rest_framework import routers

from .views.UserView import ChannelViewSet, ProfileViewSet, UserViewSet
from .views.likes import PostLikesView
from .views.posts import Posts
from .views.profiles import Profiles

router = routers.DefaultRouter()
router.register('channels', ChannelViewSet)
router.register('profile', ProfileViewSet)  # Todo:Negin Check
router.register('register', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('profiles/<str:username>/', Profiles.as_view()),
    path('posts/<str:channelId>/<int:postNumber>', Posts.as_view()),
    path('posts/<str:channelId>', Posts.as_view(), kwargs={'postNumber': 0}),
    path('postLikes/<str:channelId>/<int:postNumber>/<int:value>', PostLikesView.as_view()),
    path('postLikes/<str:channelId>/<int:postNumber>', PostLikesView.as_view(), kwargs={'value': 0}),
]
