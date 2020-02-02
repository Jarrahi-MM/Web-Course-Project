from rest_framework import status, authentication
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Post, ChannelInfo, PostLike


class PostLikesView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def put(request, channelId, postNumber, value):
        # value of +1 is positive and value of +2 is negative
        try:
            channel = ChannelInfo.objects.get(channelId=channelId)
        except ChannelInfo.DoesNotExist:
            return Response('Invalid channel', status=status.HTTP_400_BAD_REQUEST)
        try:
            post = channel.posts.get(postNumber=postNumber)
        except Post.DoesNotExist:
            return Response('Invalid post number', status=status.HTTP_400_BAD_REQUEST)
        if request.user.is_anonymous:
            return Response("You're not logged in", status=status.HTTP_400_BAD_REQUEST)

        try:
            like = post.likes.get(user=request.user)
            if like.isPositive:
                post.likesNum -= 1
            else:
                post.likesNum += 1
        except PostLike.DoesNotExist:
            like = PostLike.objects.create(user=request.user, post=post, isPositive=(value == 1))

        if value == +1:
            post.likesNum += 1
            like.isPositive = True
        if value == +2:
            post.likesNum -= 1
            like.isPositive = False
        post.save()
        if value == 0:
            like.delete()
        else:
            like.save()
        return Response("post likes updated to:" + str(post.likesNum), status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def get(request, channelId, postNumber, value):
        # value is ignored
        try:
            channel = ChannelInfo.objects.get(channelId=channelId)
        except ChannelInfo.DoesNotExist:
            return Response('Invalid channel', status=status.HTTP_400_BAD_REQUEST)
        try:
            post = channel.posts.get(postNumber=postNumber)
        except Post.DoesNotExist:
            return Response('Invalid post number', status=status.HTTP_400_BAD_REQUEST)
        if request.user.is_anonymous:
            return Response("You're not logged in", status=status.HTTP_400_BAD_REQUEST)

        try:
            like = post.likes.get(user=request.user)
            if like.isPositive:
                return Response("You have liked" + str(post.likesNum), status=status.HTTP_200_OK)
            else:
                return Response("You have disliked" + str(post.likesNum), status=status.HTTP_200_OK)
        except PostLike.DoesNotExist:
            return Response("You haven't liked" + str(post.likesNum), status=status.HTTP_200_OK)
