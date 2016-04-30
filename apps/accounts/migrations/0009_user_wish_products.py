# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-30 19:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_auto_20160430_1917'),
        ('accounts', '0008_user_favorite_shops'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='wish_products',
            field=models.ManyToManyField(related_name='wish_products', to='products.Product'),
        ),
    ]