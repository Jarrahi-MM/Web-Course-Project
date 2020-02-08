from django.contrib import admin

from .models import Channel, Comment, ProfileInfo, Alert, Post, PostLike


# UserAdmin.fieldsets = None
# UserAdmin.fields = ['username', 'email', 'followings']
# UserAdmin.list_display = ['username', ]
# UserAdmin.filter_horizontal = ['followings', ]


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    fields = ['channelId', 'channelName', 'owner', 'contributors', 'followers', 'blockedUsers', 'followersNum',
              'postsNum', 'isPersonal', 'description']
    list_display = ['channelId', ]
    filter_horizontal = ('followers', 'contributors', 'blockedUsers',)


@admin.register(ProfileInfo)
class ProfileAdmin(admin.ModelAdmin):
    fields = ['user', 'image', 'city', 'country', 'phoneNum', 'profilePic', 'followingsNum', ]
    list_display = ['user', ]


@admin.register(Post)
class ChannelAdmin(admin.ModelAdmin):
    fields = ['postNumber', 'postTitle', 'channel', 'creator', 'creationDate', 'updateVal', 'firstComment',
              'likesNum', 'text', 'likes', ]
    list_display = ['channel', 'postNumber', ]


@admin.register(PostLike)
class ChannelAdmin(admin.ModelAdmin):
    fields = ['user', 'post', 'isPositive', ]
    list_display = ['user', 'post', ]


admin.site.register(Comment)
admin.site.register(Alert)
