from django.contrib import admin

from .models import PostLike, CommentLike, ChannelInfo, Post, Comment, ProfileInfo

admin.site.register(ChannelInfo)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(PostLike)
admin.site.register(CommentLike)
admin.site.register(ProfileInfo)