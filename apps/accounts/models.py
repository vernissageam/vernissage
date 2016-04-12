# -*- coding: utf-8 -*-


from django.contrib.auth.models import AbstractUser
from django.db import models
from image_cropping import ImageCropField, ImageRatioField

from core.models import AbstractDate


class User(AbstractUser, AbstractDate):

    USER_TYPES = (
        ('buyer', 'Buyer'),
        ('seller', 'Seller'),
    )

    auth_key = models.CharField(null=True, blank=True, max_length=255)
    type = models.CharField(choices=USER_TYPES, max_length=32)
    phone_number = models.CharField(null=True, blank=True, max_length=32)
    image = ImageCropField(default='profiles/default.png', upload_to='profiles')
    cropping = ImageRatioField('image', '430x360')

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):

        self.username = self.email
        super(User, self).save(force_insert, force_update, using, update_fields)

        return self

    def __unicode__(self):
        return self.email
