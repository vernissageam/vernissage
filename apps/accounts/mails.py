# -*- coding: utf-8 -*-


from django.template import Context
from django.template.loader import get_template
from django.conf import settings
from django.utils.html import strip_tags
from django.core.mail import send_mail

from .models import User
from .utils import generate_activation_key


def activation_mail(user):
    subject = 'Activate your account'
    from_email = settings.SITE_EMAIL
    to_email = [user.email, ]
    context = Context({
        'user': user,
        'redirect_url': settings.BASE_URL+'accounts/activate/'+user.auth_key,
    })

    html_message = get_template('accounts/user_mails/activation_mail.html').render(context)
    message = strip_tags(html_message)

    send_mail(
        subject=subject,
        message=message,
        from_email=from_email,
        recipient_list=to_email,
        html_message=html_message
    )


def reset_mail(email):
    reset_key = generate_activation_key(email)
    user = User.objects.get(email=email)
    user.auth_key = reset_key
    user.save(update_fields=['auth_key'])

    subject = 'Reset account password'
    from_email = settings.SITE_EMAIL
    to_email = [email, ]
    context = Context({
        'redirect_url': settings.BASE_URL+'accounts/change_pass/'+reset_key,
        'site_name': settings.SITE_EMAIL,
    })

    html_message = get_template('accounts/reset/mails/password_reset_email.html').render(context)
    message = strip_tags(html_message)

    send_mail(
        subject=subject,
        message=message,
        from_email=from_email,
        recipient_list=to_email,
        html_message=html_message
    )
