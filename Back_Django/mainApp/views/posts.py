from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from mainApp.models import Post, ChannelInfo
from ..serializers import PostSerializer


class Posts(APIView):
    def get(self, request, channelId, postNumber):
        try:
            channel = ChannelInfo.objects.get(channelId=channelId)
        except User.DoesNotExist:
            return Response('Invalid username')
        try:
            post = channel.posts.get(postNumber=postNumber)
        except Post.DoesNotExist:
            return Response('Invalid post number')
        # serializer = self.get_serializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)
        # headers = self.get_success_headers(serializer.data)
        # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(PostSerializer(post).data, status.HTTP_200_OK)

    def post(self, request, channelId, postNumber):
        return Response("Fuck Posts", status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, channelId, postNumber):
        return Response("Fuck Posts", status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, channelId, postNumber):
        return Response("Fuck Posts", status=status.HTTP_400_BAD_REQUEST)
