from django.contrib.auth.models import User
from django.db import models


class ChannelInfo(models.Model):
    channelId = models.CharField(max_length=16, blank=False, null=False, unique=True, primary_key=True)
    owner = models.ForeignKey(User, on_delete='CASCADE', blank=False)
    contributor = models.ManyToManyField(User, blank=True, null=True)
    followersNum = models.IntegerField(default=0)
    followingsNum = models.IntegerField(default=0)
    postsNum = models.IntegerField(default=0)
    isPersonal = models.BooleanField(null=False, blank=False)
