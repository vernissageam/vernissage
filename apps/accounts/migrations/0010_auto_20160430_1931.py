# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-30 19:31
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_user_wish_products'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='wish_products',
            new_name='wish_list',
        ),
    ]
