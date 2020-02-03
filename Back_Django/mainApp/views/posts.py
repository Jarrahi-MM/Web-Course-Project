from datetime import datetime

from rest_framework import status, authentication
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Post, Channel, Comment
from ..serializers import PostSerializer


class Posts(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def get(request, channelId, postNumber):
        try:
            channel = Channel.objects.get(channelId=channelId)
        except Channel.DoesNotExist:
            return Response('Invalid channel', status=status.HTTP_400_BAD_REQUEST)
        try:
            post = channel.posts.get(postNumber=postNumber)
        except Post.DoesNotExist:
            return Response('Invalid post number', status=status.HTTP_400_BAD_REQUEST)
        return Response(PostSerializer(post).data, status.HTTP_200_OK)

    @staticmethod
    def post(request, channelId, postNumber):
        try:
            channel = Channel.objects.get(channelId=channelId)
        except Channel.DoesNotExist:
            return Response('Invalid channel', status=status.HTTP_400_BAD_REQUEST)
        if request.user.is_anonymous:
            return Response("You're not logged in", status=status.HTTP_400_BAD_REQUEST)
        # bad performance
        if channel.contributors.all().filter(username=request.user.username).count() != 1 and \
                request.user.username != channel.owner.username:
            return Response("You don't have access", status=status.HTTP_400_BAD_REQUEST)

        channel.postsNum += 1
        initial_comment = Comment.objects.create(commentNumber=0, supComment=None, creator=request.user, text='initial',
                                                 likesNum=0, creationDate=datetime.now())
        post = Post.objects.create(postNumber=channel.postsNum, channel=channel, creator=request.user,
                                   creationDate=datetime.now(), updateVal=0, firstComment=initial_comment,
                                   likesNum=0, image=request.data['image'], text=request.data['text'])
        initial_comment.save()
        post.save()
        channel.save()
        print(request.data['text'])
        return Response(post.postNumber, status=status.HTTP_201_CREATED)

    @staticmethod
    def put(request, channelId, postNumber):
        try:
            channel = Channel.objects.get(channelId=channelId)
        except Channel.DoesNotExist:
            return Response('Invalid channel', status=status.HTTP_400_BAD_REQUEST)
        try:
            post = channel.posts.get(postNumber=postNumber)
        except Post.DoesNotExist:
            return Response('Invalid post number', status=status.HTTP_400_BAD_REQUEST)
        if request.user.is_anonymous:
            return Response("You're not logged in", status=status.HTTP_400_BAD_REQUEST)
        if (request.user.username != post.creator.username) and (
                request.user.username != channel.owner.username):
            return Response("You can't delete the post", status=status.HTTP_400_BAD_REQUEST)
        post.creationDate = datetime.now()
        post.updateVal += 1
        post.image = request.data['image']
        post.text = request.data['text']
        post.save()
        return Response("post updated", status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def delete(request, channelId, postNumber):
        try:
            channel = Channel.objects.get(channelId=channelId)
        except Channel.DoesNotExist:
            return Response('Invalid channel', status=status.HTTP_400_BAD_REQUEST)
        try:
            post = channel.posts.get(postNumber=postNumber)
        except Post.DoesNotExist:
            return Response('Invalid post number', status=status.HTTP_400_BAD_REQUEST)
        if request.user.is_anonymous:
            return Response("You're not logged in", status=status.HTTP_400_BAD_REQUEST)
        if (request.user.username != post.creator.username) and (
                request.user.username != channel.owner.username):
            return Response("You can't delete the post", status=status.HTTP_400_BAD_REQUEST)
        post.delete()
        return Response('', status.HTTP_200_OK)
