from django.contrib.auth.models import User
from django.db import models


class ChannelInfo(models.Model):
    channelId = models.CharField(max_length=16, blank=False, null=False, unique=True, primary_key=True)
    owner = models.ForeignKey(User, on_delete='CASCADE', blank=False, related_name='owningChannels')
    contributor = models.ManyToManyField(User, blank=True, null=True, related_name='contributedChannels')
    followersNum = models.IntegerField(default=0)
    followingsNum = models.IntegerField(default=0)
    postsNum = models.IntegerField(default=0)
    isPersonal = models.BooleanField(null=False, blank=False)


class Post(models.Model):
    postId = models.IntegerField(primary_key=True, auto_created=True)
    channel = models.ForeignKey(ChannelInfo, blank=False, null=False, on_delete="CASCADE", related_name='posts')
    creator = models.ForeignKey(User, blank=False, null=False, on_delete="SET_NULL")
    creationDate = models.DateField(blank=False)
    updateVal = models.IntegerField(default=0, blank=False)


class Like(models.Model):
    user = models.ForeignKey(User, blank=False, null=False, on_delete='CASCADE', related_name='likes')
    post = models.ForeignKey(Post, blank=False, null=False, on_delete='CASCADE', related_name='likes')
    isPositive = models.BooleanField(default=True)


