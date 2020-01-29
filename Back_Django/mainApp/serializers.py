from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import ChannelInfo, Comment, Post, ProfileInfo


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChannelInfo
        fields = ('channelId', 'owner', 'contributor', 'followersNum', 'followingsNum', 'postsNum', 'isPersonal')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'last_name', 'email')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.save()
        Token.objects.create(user=user)
        profile = ProfileInfo.objects.create(user=user, city='', country='', phoneNum='')
        profile.save()
        return user


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)

    class Meta:
        model = ProfileInfo
        fields = ('user', 'city', 'country', 'phoneNum')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ()


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ()
