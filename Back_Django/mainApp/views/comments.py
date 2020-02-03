from datetime import datetime

from rest_framework import status, authentication
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Comment
from ..serializers import CommentSerializer


class CommentView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def get(request, ):
        try:
            supComment = Comment.objects.get(id=request.data['fatherId'])
        except Comment.DoesNotExist:
            return Response('Invalid Father', status=status.HTTP_400_BAD_REQUEST)
        if request.user.is_anonymous:
            return Response("You're not logged in", status=status.HTTP_400_BAD_REQUEST)

        comments = supComment.subComments.filter(commentNumber__gte=request.data['from'],
                                                 commentNumber__lt=request.data['to'])
        return Response(CommentSerializer(comments, many=True).data, status=status.HTTP_201_CREATED)

    @staticmethod
    def post(request):
        try:
            supComment = Comment.objects.get(id=request.data['fatherId'])
        except Comment.DoesNotExist:
            return Response('Invalid Father', status=status.HTTP_400_BAD_REQUEST)
        if request.user.is_anonymous:
            return Response("You're not logged in", status=status.HTTP_400_BAD_REQUEST)

        comment = Comment.objects.create(commentNumber=supComment.subCommentsNum + 1, supComment=supComment,
                                         creator=request.user, text=request.data['text'], likesNum=0, subCommentsNum=0,
                                         creationDate=datetime.now())

        supComment.subCommentsNum += 1
        comment.save()
        supComment.save()
        return Response(CommentSerializer(comment, many=False).data, status=status.HTTP_201_CREATED)

    # @staticmethod
    # def put(request):
    #     try:
    #         channel = Channel.objects.get(channelId=channelId)
    #     except Channel.DoesNotExist:
    #         return Response('Invalid channel', status=status.HTTP_400_BAD_REQUEST)
    #     try:
    #         post = channel.posts.get(postNumber=postNumber)
    #     except Post.DoesNotExist:
    #         return Response('Invalid post number', status=status.HTTP_400_BAD_REQUEST)
    #     if request.user.is_anonymous:
    #         return Response("You're not logged in", status=status.HTTP_400_BAD_REQUEST)
    #     if (request.user.username != post.creator.username) and (
    #             request.user.username != channel.owner.username):
    #         return Response("You can't delete the post", status=status.HTTP_400_BAD_REQUEST)
    #     post.creationDate = datetime.now()
    #     post.updateVal += 1
    #     post.image = request.data['image']
    #     post.text = request.data['text']
    #     post.save()
    #     return Response(PostSerializer(post, many=False).data, status=status.HTTP_400_BAD_REQUEST)

    # @staticmethod
    # def delete(request):
    #     try:
    #         channel = Channel.objects.get(channelId=channelId)
    #     except Channel.DoesNotExist:
    #         return Response('Invalid channel', status=status.HTTP_400_BAD_REQUEST)
    #     try:
    #         post = channel.posts.get(postNumber=postNumber)
    #     except Post.DoesNotExist:
    #         return Response('Invalid post number', status=status.HTTP_400_BAD_REQUEST)
    #     if request.user.is_anonymous:
    #         return Response("You're not logged in", status=status.HTTP_400_BAD_REQUEST)
    #     if (request.user.username != post.creator.username) and (
    #             request.user.username != channel.owner.username):
    #         return Response("You can't delete the post", status=status.HTTP_400_BAD_REQUEST)
    #     post.delete()
    #     return Response('', status.HTTP_200_OK)
