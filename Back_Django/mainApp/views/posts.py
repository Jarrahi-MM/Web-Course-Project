from datetime import datetime

from rest_framework import status, authentication
from rest_framework.response import Response
from rest_framework.views import APIView

from mainApp.models import Post, ChannelInfo, Comment
from ..serializers import PostSerializer


class Posts(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def get(request, channelId, postNumber):
        try:
            channel = ChannelInfo.objects.get(channelId=channelId)
        except ChannelInfo.DoesNotExist:
            return Response('Invalid channel')
        try:
            post = channel.posts.get(postNumber=postNumber)
        except Post.DoesNotExist:
            return Response('Invalid post number')
        return Response(PostSerializer(post).data, status.HTTP_200_OK)

    def post(self, request, channelId, postNumber):
        try:
            channel = ChannelInfo.objects.get(channelId=channelId)
        except ChannelInfo.DoesNotExist:
            return Response('Invalid channel')
        if request.user.is_anonymous:
            return Response("You're not logged in")
        # bad performance
        if channel.contributors.all().filter(
                username=request.user.username).count() != 0 and request.user.username is not channel.owner.username:
            return Response("You don't have access")
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


def put(self, request, channelId, postNumber):
    return Response("Fuck Posts", status=status.HTTP_400_BAD_REQUEST)


def delete(self, request, channelId, postNumber):
    return Response("Fuck Posts", status=status.HTTP_400_BAD_REQUEST)
