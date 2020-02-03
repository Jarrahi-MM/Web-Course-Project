from django.contrib.auth.models import User
from django.db import models


class Channel(models.Model):
    channelId = models.CharField(max_length=16, blank=False, null=False, unique=True, primary_key=True)
    channelName = models.CharField(max_length=30, unique=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, related_name='owningChannels')
    contributors = models.ManyToManyField(User, blank=True, related_name='contributedChannels')
    followers = models.ManyToManyField(User, blank=True, related_name='followings')
    followersNum = models.IntegerField(default=0)
    followingsNum = models.IntegerField(default=0)
    postsNum = models.IntegerField(default=0)
    isPersonal = models.BooleanField(null=False, blank=False)
    description = models.TextField(default='Description')


class ProfileInfo(models.Model):
    user = models.OneToOneField(User, blank=False, null=False, on_delete=models.CASCADE, related_name='profile',
                                primary_key=True)
    city = models.CharField(max_length=16, blank=True, null=True)
    country = models.CharField(max_length=16, blank=True, null=True)
    phoneNum = models.CharField(max_length=16, blank=True, null=True)


class Comment(models.Model):
    commentNumber = models.IntegerField(blank=False, null=False)
    supComment = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null=True)
    creator = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL)
    text = models.TextField()
    likesNum = models.IntegerField()
    subCommentsNum = models.IntegerField(default=0)
    creationDate = models.DateTimeField(blank=False)

    class Meta:
        # unique_together = ['supComment', 'commentNumber'] Todo:Think
        index_together = ['supComment', 'commentNumber']


class Post(models.Model):
    postNumber = models.IntegerField()
    postTitle = models.CharField(max_length=50)
    channel = models.ForeignKey(Channel, blank=False, null=False, on_delete=models.CASCADE, related_name='posts')
    creator = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL)
    creationDate = models.DateTimeField(blank=False)
    updateVal = models.IntegerField(default=0, blank=False)
    firstComment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    likesNum = models.IntegerField()
    image = models.CharField(max_length=32, blank=True, null=True)
    text = models.TextField(blank=True, null=True)

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


class CommentAlerts(models.Model):
    user = models.ForeignKey(User, blank=False, null=False, on_delete=models.CASCADE, related_name='commentAlerts')
    comment = models.ForeignKey(Comment, blank=False, null=False, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['user', 'comment']
        index_together = ['user', 'comment']


class FollowAlerts(models.Model):
    user = models.ForeignKey(User, blank=False, null=False, on_delete=models.CASCADE, related_name='followAlerts')
    follower = models.ForeignKey(User, blank=False, null=False, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['user', 'follower']
        index_together = ['user', 'follower']
