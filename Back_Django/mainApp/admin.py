from django.contrib import admin

from .models import PostLike, CommentLike, Channel, Post, Comment, ProfileInfo

admin.site.register(Channel)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(PostLike)
admin.site.register(CommentLike)
admin.site.register(ProfileInfo)