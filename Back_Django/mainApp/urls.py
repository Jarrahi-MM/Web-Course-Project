from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers

from .views.UserView import ChannelViewSet, ProfileViewSet, UserViewSet
from .views.likes import PostLikesView, CommentLikesView
from .views.posts import Posts
from .views.profiles import Profiles
from .views.updatePassword import UpdatePassword
from .views.users import Users
from .views.search import search

router = routers.DefaultRouter()
router.register('channels', ChannelViewSet)
router.register('profile', ProfileViewSet)  # Todo:Negin Check
router.register('register', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('change-password/', UpdatePassword.as_view()),
    path('users/', Users.as_view()),
    path('profiles/<str:username>/', Profiles.as_view()),
    path('posts/<str:channelId>/<int:postNumber>', Posts.as_view()),
    path('posts/<str:channelId>', Posts.as_view(), kwargs={'postNumber': 0}),
    path('postLikes/<str:channelId>/<int:postNumber>/<int:value>', PostLikesView.as_view()),
    path('postLikes/<str:channelId>/<int:postNumber>', PostLikesView.as_view(), kwargs={'value': 0}),
    path('postLikes/<str:commentId>/<int:value>', CommentLikesView.as_view()),
    path('postLikes/<str:commentId>', CommentLikesView.as_view(), kwargs={'value': 0}),
    path('search/', search)
]

urlpatterns += router.urls
