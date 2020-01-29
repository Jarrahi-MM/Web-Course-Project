from django.contrib.auth.models import User
from django.db import models


class ChannelInfo(models.Model):
    channelId = models.CharField(max_length=16, blank=False, null=False, unique=True, primary_key=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, related_name='owningChannels')
    contributor = models.ManyToManyField(User, blank=True, related_name='contributedChannels')
    followersNum = models.IntegerField(default=0)
    followingsNum = models.IntegerField(default=0)
    postsNum = models.IntegerField(default=0)
    isPersonal = models.BooleanField(null=False, blank=False)


class Comment(models.Model):
    commentNumber = models.IntegerField()
    supComment = models.ForeignKey("self", on_delete=models.CASCADE)
    text = models.TextField()
    likesNum = models.IntegerField()
    creationDate = models.DateField(blank=False)

    class Meta:
        unique_together = ['supComment', 'commentNumber']
        index_together = ['supComment', 'commentNumber']


class Post(models.Model):
    postNumber = models.IntegerField()
    channel = models.ForeignKey(ChannelInfo, blank=False, null=False, on_delete=models.CASCADE, related_name='posts')
    creator = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL)
    creationDate = models.DateField(blank=False)
    updateVal = models.IntegerField(default=0, blank=False)
    firstComment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    likesNum = models.IntegerField()

    class Meta:
        unique_together = ['channel', 'postNumber']
        index_together = ['channel', 'postNumber']


class PostLike(models.Model):
    user = models.ForeignKey(User, blank=False, null=False, on_delete=models.CASCADE, related_name='postLikes')
    post = models.ForeignKey(Post, blank=False, null=False, on_delete=models.CASCADE, related_name='likes')
    isPositive = models.BooleanField(default=True)

    class Meta:
        unique_together = ['user', 'post']
        index_together = ['user', 'post']


class CommentLike(models.Model):
    user = models.ForeignKey(User, blank=False, null=False, on_delete=models.CASCADE, related_name='commentLikes')
    comment = models.ForeignKey(Comment, blank=False, null=False, on_delete=models.CASCADE, related_name='likes')
    isPositive = models.BooleanField(default=True)

    class Meta:
        unique_together = ['user', 'comment']
        index_together = ['user', 'comment']
