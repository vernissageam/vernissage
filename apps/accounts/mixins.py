# -*- coding: utf-8 -*-


from django.views.generic import TemplateView

from .forms import RegisterForm
from .mails import activation_mail


class RegisterMixin(TemplateView):
    template_name = 'accounts/register.html'
    form = RegisterForm
    authenticated_redirect_url = '/'

    def get(self, request, *args, **kwargs):
        try:
            data = request.session['social_data']
        except KeyError:
            data = {}

        if data:
            form = self.form(data=data)
            del request.session['social_data']
            return self.render_to_response(self.get_context_data(form=form))
        else:
            return self.render_to_response(self.get_context_data())

    def save_user(self, form, type):

        if form.is_valid():
            password = form.cleaned_data['password']
            new_user_instance = form.save(commit=False)
            new_user_instance.set_password(password)
            new_user_instance.is_active = 0
            new_user_instance.type = type
            new_user_instance.save()
            activation_mail(new_user_instance)

            return new_user_instance

        return False

