# Generated by Django 3.0.1 on 2020-02-07 10:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0005_channel_blockedusers'),
    ]

    operations = [
        migrations.AddField(
            model_name='profileinfo',
            name='profilePic',
            field=models.URLField(blank=True, max_length=400, null=True),
        ),
    ]
