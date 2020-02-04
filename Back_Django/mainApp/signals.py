from django.dispatch import receiver
from django.db.models.signals import post_save, m2m_changed
from .models import Comment, Alert, Channel


@receiver(m2m_changed, sender=Channel.followers.through)
def on_new_follow(sender, instance, model, **kwargs):
    if instance.isPersonal:
        Alert.objects.create(
            is_comment=False,
            user=instance.creator,
            by_user=model,
        )


@receiver(post_save, sender=Comment)
def on_new_comment(sender, instance, created, **kwargs):
    if created:
        Alert.objects.create(
            is_comment=True,
            user=get_post_user_from_comment(instance),
            by_user=instance.creator,
            comment=instance,
        )


def get_post_user_from_comment(comment):
    while comment.supComment is not None:
        comment = comment.supComment
    return comment.creator
