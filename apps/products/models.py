# -*- coding: utf-8 -*-


from django.db import models

from core.models import AbstractDate
from accounts.models import User
from shops.models import Shop


class ProductCategory(AbstractDate):

    name = models.CharField(max_length=32)
    description = models.TextField()

    def __unicode__(self):
        return self.name


class Product(AbstractDate):

    shop = models.ForeignKey(Shop)
    name = models.CharField(max_length=32)
    description = models.TextField(max_length=500)
    categories = models.ManyToManyField(ProductCategory)
    image = models.ImageField(default='products/default.png', upload_to='products')

    def __unicode__(self):
        return self.name or 'Product object'


class Cart(AbstractDate):

    user = models.OneToOneField(User)
    products = models.ManyToManyField(Product)

    def __unicode__(self):
        return 'Cart of ' + self.user.email
