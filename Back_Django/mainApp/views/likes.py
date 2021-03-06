from rest_framework import status, authentication, permissions
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Post, Channel, PostLike, Comment, CommentLike
from ..serializers import PostSerializer, CommentSerializer


@permission_classes((permissions.IsAuthenticated,))
class PostLikesView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def put(request):
        # value of +1 is positive and value of +2 is negative
        try:
            channel = Channel.objects.get(channelId=request.data['channelId'])
        except Channel.DoesNotExist:
            return Response('Invalid channel', status=status.HTTP_400_BAD_REQUEST)
        try:
            post = channel.posts.get(postNumber=request.data['postNumber'])
        except Post.DoesNotExist:
            return Response('Invalid post number', status=status.HTTP_400_BAD_REQUEST)

        value = int(request.data['value'])

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

        return Response(PostSerializer(post, many=False).data, status=status.HTTP_202_ACCEPTED)

    # @staticmethod
    # def post(request):
    #     # value is ignored
    #     try:
    #         channel = Channel.objects.get(channelId=request.data['channelId'])
    #     except Channel.DoesNotExist:
    #         return Response('Invalid channel', status=status.HTTP_400_BAD_REQUEST)
    #     try:
    #         post = channel.posts.get(postNumber=request.data['postNumber'])
    #     except Post.DoesNotExist:
    #         return Response('Invalid post number', status=status.HTTP_400_BAD_REQUEST)
    #     if request.user.is_anonymous:
    #         return Response("You're not logged in", status=status.HTTP_400_BAD_REQUEST)
    #
    #     try:
    #         like = post.likes.get(user=request.user)
    #         if like.isPositive:
    #             return Response("liked", status=status.HTTP_200_OK)
    #         else:
    #             return Response("disliked", status=status.HTTP_200_OK)
    #     except PostLike.DoesNotExist:
    #         return Response("not liked", status=status.HTTP_200_OK)

@permission_classes((permissions.IsAuthenticated,))
class CommentLikesView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def put(request):
        # value of +1 is positive and value of +2 is negative
        try:
            comment = Comment.objects.get(id=request.data['commentId'])
        except Comment.DoesNotExist:
            return Response('Invalid Comment', status=status.HTTP_400_BAD_REQUEST)

        value = int(request.data['value'])

        try:
            like = comment.likes.get(user=request.user)
            if like.isPositive:
                comment.likesNum -= 1
            else:
                comment.likesNum += 1
        except CommentLike.DoesNotExist:
            like = CommentLike.objects.create(user=request.user, comment=comment, isPositive=(value == 1))

        if value == +1:
            comment.likesNum += 1
            like.isPositive = True
        if value == +2:
            comment.likesNum -= 1
            like.isPositive = False
        comment.save()
        if value == 0:
            like.delete()
        else:
            like.save()
        return Response(CommentSerializer(comment, many=False).data, status=status.HTTP_202_ACCEPTED)

    # @staticmethod
    # def post(request):
    #     # value is ignored
    #     try:
    #         comment = Comment.objects.get(id=request.data['commentId'])
    #     except Comment.DoesNotExist:
    #         return Response('Invalid Comment', status=status.HTTP_400_BAD_REQUEST)
    #     if request.user.is_anonymous:
    #         return Response("You're not logged in", status=status.HTTP_400_BAD_REQUEST)
    #
    #     try:
    #         like = comment.likes.get(user=request.user)
    #         if like.isPositive:
    #             return Response("liked", status=status.HTTP_200_OK)
    #         else:
    #             return Response("disliked", status=status.HTTP_200_OK)
    #     except CommentLike.DoesNotExist:
    #         return Response("not liked", status=status.HTTP_200_OK)
