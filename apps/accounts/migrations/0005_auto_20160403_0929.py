# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-03 09:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_user_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='auth_key',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(blank=True, max_length=32, null=True),
        ),
    ]