# -*- coding: utf-8 -*-


from django.db import models

from core.models import AbstractDate
from accounts.models import User


class ShopCategory(AbstractDate):

    name = models.CharField(max_length=32)
    description = models.TextField()

    def __unicode__(self):
        return self.name


class Shop(AbstractDate):

    user = models.OneToOneField(User)
    name = models.CharField(max_length=32)
    description = models.TextField(max_length=500)
    categories = models.ManyToManyField(ShopCategory)
    background_image = models.ImageField(default='shops_backgrounds/default.png', upload_to='shops_backgrounds')

    def __unicode__(self):
        return self.name or 'Shop object'
