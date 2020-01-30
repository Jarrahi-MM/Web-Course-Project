# Generated by Django 3.0.1 on 2020-01-29 19:28

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ChannelInfo',
            fields=[
                ('channelId', models.CharField(max_length=16, primary_key=True, serialize=False, unique=True)),
                ('followersNum', models.IntegerField(default=0)),
                ('followingsNum', models.IntegerField(default=0)),
                ('postsNum', models.IntegerField(default=0)),
                ('isPersonal', models.BooleanField()),
                ('description', models.TextField(default='Description')),
                ('contributor', models.ManyToManyField(blank=True, related_name='contributedChannels', to=settings.AUTH_USER_MODEL)),
                ('followers', models.ManyToManyField(blank=True, related_name='followings', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owningChannels', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('commentNumber', models.IntegerField()),
                ('text', models.TextField()),
                ('likesNum', models.IntegerField()),
                ('creationDate', models.DateField()),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('supComment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainApp.Comment')),
            ],
            options={
                'unique_together': {('supComment', 'commentNumber')},
                'index_together': {('supComment', 'commentNumber')},
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('postNumber', models.IntegerField()),
                ('creationDate', models.DateField()),
                ('updateVal', models.IntegerField(default=0)),
                ('likesNum', models.IntegerField()),
                ('channel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='mainApp.ChannelInfo')),
                ('creator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('firstComment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainApp.Comment')),
            ],
            options={
                'unique_together': {('channel', 'postNumber')},
                'index_together': {('channel', 'postNumber')},
            },
        ),
        migrations.CreateModel(
            name='ProfileInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(blank=True, max_length=16, null=True)),
                ('country', models.CharField(blank=True, max_length=16, null=True)),
                ('phoneNum', models.CharField(blank=True, max_length=16, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PostLike',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isPositive', models.BooleanField(default=True)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='mainApp.Post')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='postLikes', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'post')},
                'index_together': {('user', 'post')},
            },
        ),
        migrations.CreateModel(
            name='FollowAlerts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('follower', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followAlerts', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'follower')},
                'index_together': {('user', 'follower')},
            },
        ),
        migrations.CreateModel(
            name='CommentLike',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isPositive', models.BooleanField(default=True)),
                ('comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='mainApp.Comment')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commentLikes', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'comment')},
                'index_together': {('user', 'comment')},
            },
        ),
        migrations.CreateModel(
            name='CommentAlerts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainApp.Comment')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commentAlerts', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'comment')},
                'index_together': {('user', 'comment')},
            },
        ),
    ]