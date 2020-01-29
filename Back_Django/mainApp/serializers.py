from rest_framework import serializers

from mainApp.models import ChannelInfo, Comment, Post, PostLike, CommentLike


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChannelInfo
        fields = ('channelId', 'owner', 'contributor', 'followersNum', 'followingsNum', 'postsNum', 'isPersonal')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ()


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ()


class CommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentLike
        fields = ()


class PostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLike
        fields = ()
