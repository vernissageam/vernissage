# -*- coding: utf-8 -*-


import hashlib
import random


def generate_activation_key(value):
    salt = hashlib.sha1(str(random.random())).hexdigest()[:5]
    if isinstance(value, unicode):
        value = value.encode('utf-8')
    activation_key = hashlib.sha1(salt + value).hexdigest()
    return activation_key
