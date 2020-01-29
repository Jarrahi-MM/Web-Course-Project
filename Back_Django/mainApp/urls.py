from django.urls import path, include
from rest_framework import routers

from Back_Django.mainApp.views import ChannelViewSet

router = routers.DefaultRouter()
router.register('channels', ChannelViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
