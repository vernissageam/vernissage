# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-02 16:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_user_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.ImageField(default=b'default.png', upload_to=b'profile'),
        ),
    ]
