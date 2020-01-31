from rest_framework import status, authentication
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Post, ChannelInfo, PostLike


class PostLikesView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def put(request, channelId, postNumber, value):
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
        return Response("like updated", status=status.HTTP_400_BAD_REQUEST)


# class CommentLikesView(APIView):
#     authentication_classes = [authentication.TokenAuthentication]
#
#     @staticmethod
#     def put(request, channelId, postNumber, value):
#         try:
#             channel = ChannelInfo.objects.get(channelId=channelId)
#         except ChannelInfo.DoesNotExist:
#             return Response('Invalid channel', status=status.HTTP_400_BAD_REQUEST)
#         try:
#             post = channel.posts.get(postNumber=postNumber)
#         except Post.DoesNotExist:
#             return Response('Invalid post number', status=status.HTTP_400_BAD_REQUEST)
#         if request.user.is_anonymous:
#             return Response("You're not logged in", status=status.HTTP_400_BAD_REQUEST)
#
#         try:
#             like = post.likes.get(user=request.user)
#             if like.isPositive:
#                 post.likesNum -= 1
#             else:
#                 post.likesNum += 1
#         except PostLike.DoesNotExist:
#             like = PostLike.objects.create(user=request.user, post=post, isPositive=(value == 1))
#
#         if value == +1:
#             post.likesNum += 1
#             like.isPositive = True
#         if value == +2:
#             post.likesNum -= 1
#             like.isPositive = False
#         post.save()
#         if value == 0:
#             like.delete()
#         else:
#             like.save()
#         return Response("like updated", status=status.HTTP_400_BAD_REQUEST)