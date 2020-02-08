from django.contrib.auth.models import User
from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver

from .models import Comment, Alert, Channel


@receiver(m2m_changed, sender=Channel.followers.through, dispatch_uid='in_new_follow')
def on_new_follow(sender, instance, pk_set, **kwargs):
    instance = Channel.objects.get(channelId=instance)
    by_user = User.objects.get(id=list(pk_set)[0])
    if instance.isPersonal:
        Alert.objects.create(
            is_comment=False,
            user=instance.owner,
            by_user=by_user,
        )


@receiver(post_save, sender=Comment, dispatch_uid='on_new_comment')
def on_new_comment(sender, instance, created, **kwargs):
    if created:
        user = get_post_user_from_comment(instance)
        if not user:
            return
        post = find_post_of_comment(user, instance)
        if not post:
            return
        Alert.objects.create(
            is_comment=True,
            user=user,
            by_user=instance.creator,
            comment=instance,
            post=post
        )


def get_post_user_from_comment(comment):
    while comment.supComment is not None:
        comment = comment.supComment
    return comment.creator


def find_post_of_comment(user: User, comment):
    for post in user.post_set.all():
        if crawl_post_comments(post.firstComment, comment):
            return post
    return


def crawl_post_comments(search_comment, comment):
    if comment == search_comment:
        return True
    for subcomment in search_comment.subComments.all():
        if crawl_post_comments(subcomment, comment):
            return True
    return False
