# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-30 20:12
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_cart'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='products',
            field=models.ManyToManyField(to='products.Product'),
        ),
    ]