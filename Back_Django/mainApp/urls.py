from django.http import HttpResponse
from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from django.contrib.auth import views as auth_views

from .views.UserView import ChannelViewSet, ProfileViewSet, UserViewSet
from .views.likes import PostLikesView
from .views.posts import Posts
from .views.profiles import Profiles
from .views.Views import UpdatePassword

router = routers.DefaultRouter()
router.register('channels', ChannelViewSet)
router.register('profile', ProfileViewSet)
router.register('register', UserViewSet)


def post_process(request, username, postNumber):
    print(request, "   ", username, postNumber)
    return HttpResponse(str(request.method) + "   " + username + str(postNumber))


urlpatterns = [
    path('', include(router.urls)),
    path('change-password/', UpdatePassword.as_view()),
    path('profiles/<str:username>/', Profiles.as_view()),
    path('posts/<str:channelId>/<int:postNumber>', Posts.as_view()),
    path('posts/<str:channelId>', Posts.as_view(), kwargs={'postNumber': 0}),
    path('likes/<str:channelId>/<int:postNumber>/<int:value>', PostLikesView.as_view()),
    url(r'^api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]
