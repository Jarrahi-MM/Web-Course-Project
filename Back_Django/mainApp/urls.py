from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers

from .views.UserView import ChannelViewSet, ProfileViewSet, UserViewSet
from .views.comments import CommentView
from .views.likes import PostLikesView, CommentLikesView
from .views.posts import Posts
from .views.profiles import Profiles
from .views.channels import Channels
from .views.updatePassword import UpdatePassword
from .views.users import Users
from .views.search import search
from .views.homepageView import homepage
from .views import alertView

router = routers.DefaultRouter()
router.register('channels', ChannelViewSet)
router.register('profile', ProfileViewSet)  # Todo:Negin Check
router.register('register', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('change-password/', UpdatePassword.as_view()),
    path('channel/', Channels.as_view()),
    path('users/', Users.as_view()),
    path('profiles/<str:username>/', Profiles.as_view()),
    path('posts/<str:channelId>', Posts.as_view(), kwargs={'postNumber': 0}),
    path('posts/<str:channelId>/<int:postNumber>/', Posts.as_view()),
    path('postLikes/', PostLikesView.as_view()),
    path('commentLikes/', CommentLikesView.as_view()),
    path('comments/', CommentView.as_view()),
    path('search/', search),
    path('homepage/<str:tab_name>', homepage),
    path('alerts/all', alertView.alert_items),
    path('alerts/unreadcount', alertView.unread_count),
]

urlpatterns += router.urls
