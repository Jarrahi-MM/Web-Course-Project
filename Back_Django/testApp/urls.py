from django.urls import path

from .views import Tests

urlpatterns = [
    path('', Tests.as_view()),
]
