from django.urls import path, include
from rest_framework import routers

from .views import ChannelViewSet, ProfileViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('channels', ChannelViewSet)
router.register('profile', ProfileViewSet)
router.register('register', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
