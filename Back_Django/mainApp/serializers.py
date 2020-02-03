from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import Channel, ProfileInfo, Post


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = (
            'channelId', 'channelName', 'owner', 'contributors', 'followersNum', 'followingsNum', 'postsNum',
            'isPersonal')


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


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            'postNumber', 'postTitle', 'channel', 'creator', 'creationDate', 'updateVal', 'firstComment', 'likesNum',
            'image',
            'text')
        extra_kwargs = {'postNumber': {'read_only': True, 'required': True}}

    def create(self, validated_data):
        print(validated_data)
        return None

    def update(self, instance, validated_data):
        print(validated_data)
        return None


class SearchSerializer(serializers.Serializer):
    Users = UserSerializer(many=True)
    Channels = ChannelSerializer(many=True)
    Posts = PostSerializer(many=True)
