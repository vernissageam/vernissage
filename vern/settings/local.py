# -*- coding: utf-8 -*-


from vern.settings.base import *


DEBUG = True
TEMPLATES[0]['OPTIONS']['debug'] = True
THUMBNAIL_DEBUG = True

BASE_URL = 'http://127.0.0.1:8000/'

ALLOWED_HOSTS = ['*', ]

THIRD_PARTY_APPS += [
    'debug_toolbar',
    'django_extensions',
]

MIDDLEWARE_CLASSES += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

INSTALLED_APPS = DEFAULT_APPS + THIRD_PARTY_APPS + PROJECT_APPS

# Facebook authentication
# SOCIAL_AUTH_FACEBOOK_KEY = '889662047749011'
# SOCIAL_AUTH_FACEBOOK_SECRET = '7fc8e9d6a1152f7f1303cf73622e35d0'

# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'vern',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': '127.0.0.1',
        'PORT': ''
    }
}

# we can receive email messages using this command python -m smtpd -n -c DebuggingServer localhost:1025
EMAIL_HOST = 'localhost'
EMAIL_PORT = 1025
