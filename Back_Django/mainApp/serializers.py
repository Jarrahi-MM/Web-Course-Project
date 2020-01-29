from rest_framework import serializers

from Back_Django.mainApp.models import ChannelInfo, Comment, Post, PostLike, CommentLike


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChannelInfo
        fields = ()


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
