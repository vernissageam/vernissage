# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-02 16:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_user_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='phone_number',
            field=models.CharField(default=123123, max_length=32),
            preserve_default=False,
        ),
    ]