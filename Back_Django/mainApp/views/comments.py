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
            sup_comment = Comment.objects.get(id=request.data['fatherId'])
        except Comment.DoesNotExist:
            return Response('Invalid Father', status=status.HTTP_400_BAD_REQUEST)
        if request.user.is_anonymous:
            return Response("You're not logged in", status=status.HTTP_400_BAD_REQUEST)

        comments = sup_comment.subComments.filter(commentNumber__gte=request.data['from'],
                                                  commentNumber__lt=request.data['to'])
        return Response(CommentSerializer(comments, many=True).data, status=status.HTTP_201_CREATED)

    @staticmethod
    def post(request):
        try:
            sup_comment = Comment.objects.get(id=request.data['fatherId'])
        except Comment.DoesNotExist:
            return Response('Invalid Father', status=status.HTTP_400_BAD_REQUEST)
        if request.user.is_anonymous:
            return Response("You're not logged in", status=status.HTTP_400_BAD_REQUEST)

        comment = Comment.objects.create(commentNumber=sup_comment.subCommentsNum + 1, supComment=sup_comment,
                                         creator=request.user, text=request.data['text'], likesNum=0, subCommentsNum=0,
                                         creationDate=datetime.now())

        sup_comment.subCommentsNum += 1
        comment.save()
        sup_comment.save()
        return Response(CommentSerializer(comment, many=False).data, status=status.HTTP_201_CREATED)

    @staticmethod
    def put(request):
        try:
            comment = Comment.objects.get(id=request.data['id'])
        except Comment.DoesNotExist:
            return Response('Invalid Comment', status=status.HTTP_400_BAD_REQUEST)
        if request.user.is_anonymous:
            return Response("You're not logged in", status=status.HTTP_400_BAD_REQUEST)
        if request.user.username != comment.creator.username:
            return Response("You can not edit this comment", status=status.HTTP_400_BAD_REQUEST)

        comment.text = request.data['text']
        comment.creationDate = datetime.now()
        comment.save()

        return Response(CommentSerializer(comment, many=False).data, status=status.HTTP_201_CREATED)

    @staticmethod
    def delete(request):
        try:
            comment = Comment.objects.get(id=request.data['id'])
        except Comment.DoesNotExist:
            return Response('Invalid Comment', status=status.HTTP_400_BAD_REQUEST)
        if request.user.is_anonymous:
            return Response("You're not logged in", status=status.HTTP_400_BAD_REQUEST)
        if request.user.username != comment.creator.username:
            return Response("You can not delete this comment", status=status.HTTP_400_BAD_REQUEST)

        comment.text = 'deleted'  # Todo: Think
        comment.creationDate = datetime.now()
        comment.save()

        return Response(CommentSerializer(comment, many=False).data, status=status.HTTP_201_CREATED)
