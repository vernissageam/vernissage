# -*- coding: utf-8 -*-


import re

from django.core.exceptions import ValidationError


def alphanumeric(value):
    if not re.match("^[a-zA-Z]*$", value):
        raise ValidationError('Please enter a valid name')


def phone_number(value):
    if not re.match("^[0-9]*$", value):
        raise ValidationError('Please enter a valid phone number')
