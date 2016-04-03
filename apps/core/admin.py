# -*- coding: utf-8 -*-


from django.contrib import admin

from django.contrib.auth.models import Group
from social.apps.django_app.default.models import Association, Nonce

# UNRegister models
admin.site.unregister(Association)
admin.site.unregister(Nonce)
admin.site.unregister(Group)
