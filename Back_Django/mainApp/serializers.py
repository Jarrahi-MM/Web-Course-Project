from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import Channel, ProfileInfo, Post, Comment


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = (
            'channelId', 'channelName', 'owner', 'contributors', 'followersNum', 'followingsNum', 'postsNum',
            'isPersonal', 'description')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'last_name', 'email', 'followings')
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},
            'followings': {'required': False, 'read_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        profile = ProfileInfo.objects.create(user=user, city='', country='', phoneNum='')
        profile.save()
        channel_id = user.username
        channel = Channel.objects.create(channelId=channel_id, channelName=channel_id, owner=user, followersNum=0,
                                         followingsNum=0, postsNum=0, isPersonal=True, description='bio...')
        channel.save()
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
        return None

    def update(self, instance, validated_data):
        return None


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = (
            'commentNumber', 'supComment', 'creator', 'text', 'likesNum', 'subCommentsNum', 'creationDate',
        )
        extra_kwargs = {'commentNumber': {'read_only': True, 'required': True}}

    def create(self, validated_data):
        return None

    def update(self, instance, validated_data):
        return None


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value


class SearchSerializer(serializers.Serializer):
    Users = UserSerializer(many=True)
    Channels = ChannelSerializer(many=True)
    Posts = PostSerializer(many=True)
