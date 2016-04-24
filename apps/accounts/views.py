# -*- coding: utf-8 -*-


from django.views.generic import TemplateView, View
from django.views.generic.edit import UpdateView
from django.core.urlresolvers import reverse_lazy
from django.contrib.auth import login
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib import messages
from django.contrib.auth import update_session_auth_hash
from braces.views import AnonymousRequiredMixin

from .forms import AuthenticationForm, ResetForm, ChangePassForm, AccountUpdateForm
from .mails import reset_mail
from .models import User
from .mixins import RegisterMixin
from shops.forms import ShopForm
from shops.models import Shop


class LoginView(AnonymousRequiredMixin, TemplateView):
    template_name = 'accounts/login.html'
    form = AuthenticationForm
    authenticated_redirect_url = '/'

    def get_context_data(self, **kwargs):
        context = super(LoginView, self).get_context_data(**kwargs)
        if 'form' not in kwargs:
            context['form'] = self.form

        return context

    def post(self, request):
        form = self.form(request, data=request.POST)

        if form.is_valid():
            login(request, form.get_user())
            next_url = '/'
            if 'next' in request.GET:
                next_url = request.GET['next']

            return HttpResponseRedirect(next_url)
        else:
            print form.errors
            return self.render_to_response(self.get_context_data(form=form))


class RegisterBuyerView(AnonymousRequiredMixin, RegisterMixin):

    def get_context_data(self, **kwargs):
        context = super(RegisterBuyerView, self).get_context_data(**kwargs)
        if 'form' not in kwargs:
            context['form'] = self.form()
        context['is_buyer_register'] = True

        return context

    def post(self, request):

        form = self.form(data=request.POST)
        if self.save_user(form, 'buyer'):
            messages.success(request, "Your account was successfully created. "
                                      "Go to your email and activate your account.")
            return HttpResponseRedirect('/')
        else:
            return self.render_to_response(self.get_context_data(form=form))


class RegisterSellerView(AnonymousRequiredMixin, RegisterMixin):
    shop_form = ShopForm

    def get_context_data(self, **kwargs):
        context = super(RegisterSellerView, self).get_context_data(**kwargs)
        if 'form' not in kwargs:
            context['form'] = self.form()
        if 'shop_form' not in kwargs:
            context['shop_form'] = self.shop_form()

        return context

    def post(self, request):
        form = self.form(data=request.POST)
        shop_form = self.shop_form(data=request.POST)
        if not shop_form.is_valid():
            return self.render_to_response(self.get_context_data(
                form=form,
                shop_form=shop_form,
            ))

        new_user = self.save_user(form, 'seller')
        if new_user:
            new_shop = shop_form.save(commit=False)
            new_shop.user = new_user
            new_shop.save()

            messages.success(request, "Your account was successfully created. "
                                      "Go to your email and activate your account.")

            return HttpResponseRedirect('/')
        else:
            return self.render_to_response(self.get_context_data(
                form=form,
                shop_form=shop_form,
            ))


class ResetPassView(AnonymousRequiredMixin, TemplateView):
    reset_form = ResetForm
    template_name = 'accounts/reset/reset.html'
    authenticated_redirect_url = '/'

    def get_context_data(self, **kwargs):
        context = super(ResetPassView, self).get_context_data(**kwargs)
        if 'reset_form' not in kwargs:
            context['reset_form'] = self.reset_form
        return context

    def post(self, request):

        reset_form = self.reset_form(data=request.POST)
        if reset_form.is_valid():
            email = reset_form.cleaned_data['email']
            user = User.objects.filter(email=email).exists()
            if user:
                reset_mail(email)
                messages.success(request, 'Mail has been successfully sent.')
            else:
                messages.error(request, 'This email does not exists.')

            return HttpResponseRedirect('/')
        else:
            return self.render_to_response(self.get_context_data(reset_form=reset_form))


class ChangePass(AnonymousRequiredMixin, TemplateView):
    template_name = 'accounts/reset/change_pass.html'
    reset_form = ChangePassForm
    authenticated_redirect_url = '/'

    def get_context_data(self, **kwargs):
        context = super(ChangePass, self).get_context_data(**kwargs)
        if 'reset_form' not in kwargs:
            context['reset_form'] = self.reset_form()
        if 'reset_key' in kwargs:
            context['reset_key'] = kwargs['reset_key']

        return context

    def get(self, request, reset_key):
        try:
            User.objects.get(auth_key=reset_key)
            return self.render_to_response(self.get_context_data(reset_key=reset_key))
        except User.DoesNotExist:
            messages.error(request, "Sorry, key is invalid")
            return HttpResponseRedirect('/')

    def post(self, request, reset_key):
        reset_form = self.reset_form(data=request.POST)
        if reset_form.is_valid():
            password = reset_form.cleaned_data['password']
            user = User.objects.get(auth_key=reset_key)
            reset_form.update_pass(user, password)
            messages.success(request, "Your password has been successfully changed")
            return HttpResponseRedirect('/')
        else:
            return self.render_to_response(self.get_context_data(reset_form=reset_form))


class ActivationView(View):

    def get(self, request, *args, **kwargs):

        if self.activate(request, *args, **kwargs):
            messages.success(request, 'Your account successfully activated you can login now.')
        else:
            messages.error(request, 'Sorry link is invalid or expired.')

        return HttpResponseRedirect('/')

    def activate(self, request, *args, **kwargs):
        activate_key = kwargs['activate_key']
        try:
            user = User.objects.get(auth_key=activate_key)
        except User.DoesNotExist:
            return False

        user.is_active = True
        user.auth_key = None
        user.save(update_fields=['is_active', 'auth_key', 'modified'])

        return True


class CheckUniqueDataView(View):
    def post(self, request):

        if 'email' in request.POST and not User.objects.filter(email=request.POST['email']).exists():
                return HttpResponse("true")

        return HttpResponse("false")


class AccountUpdateView(UpdateView):
    model = User
    success_url = reverse_lazy('pages:home')
    template_name = 'accounts/update.html'
    form_class = AccountUpdateForm

    def form_valid(self, form):
        if form.cleaned_data.get('password'):
            form.instance.set_password(form.cleaned_data['password'])
            update_session_auth_hash(self.request, form.instance)

        return super(AccountUpdateView, self).form_valid(form)


class AddToFavoritesShop(View):

    def get(self, request, shop_id):

        try:
            shop = Shop.objects.get(pk=shop_id)
        except Shop.DoesNotExist:
            return HttpResponse('false')

        # Allow add/remove favorite shops only BUYERS
        if not request.user.type == 'buyer':
            return HttpResponse('false')

        request.user.favorite_shops.add(shop)

        return HttpResponse('true')


class RemoveFromFavoritesShop(View):

    def get(self, request, shop_id):

        try:
            shop = Shop.objects.get(pk=shop_id)
        except Shop.DoesNotExist:
            return HttpResponse('false')

        request.user.favorite_shops.remove(shop)

        return HttpResponse('true')
