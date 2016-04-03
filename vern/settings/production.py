# -*- coding: utf-8 -*-


from vern.settings.base import *


DEBUG = True
TEMPLATES[0]['OPTIONS']['debug'] = True
THUMBNAIL_DEBUG = True

BASE_URL = 'http://keto.codebnb.me/'

ALLOWED_HOSTS = ['*', ]

THIRD_PARTY_APPS += [
    'debug_toolbar',
    'django_extensions',
]

MIDDLEWARE_CLASSES += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'vern',
        'USER': 'vern',
        'PASSWORD': 'xVuzu3yYP89K53T6',
        'HOST': '127.0.0.1',
        'PORT': '',
    }
}

INSTALLED_APPS = DEFAULT_APPS + THIRD_PARTY_APPS + PROJECT_APPS
