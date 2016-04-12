# -*- coding: utf-8 -*-


from django import forms
from django.contrib.auth.forms import AuthenticationForm as CoreAuthenticationForm
from django.contrib.auth.forms import UserCreationForm as CoreUserCreationForm
from image_cropping import ImageCropWidget

from .models import User
from .utils import generate_activation_key
from .validators import alphanumeric, phone_number


class LoginFormMixin(object):
    """
    Base class for authenticating users. Extend this to get a form that accepts
    email/password login.
    """
    error_messages = {
        'not_validating': "Invalid email or password",
        'not_blank': 'Enter email and password',
    }
    email = forms.CharField(label='Email', max_length=254, required=True)
    password = forms.CharField(label="Password", widget=forms.PasswordInput, required=True)

    def clean(self):
        username = self.cleaned_data.get('username', '')
        password = self.cleaned_data.get('password', '')

        if username and password:
            self.user = None

            if User.objects.filter(username=username).exists():

                user = User.objects.get(username=username)
                if user.check_password(password):
                    self.user = user

                    if self.user is not None:
                        self.user_cache = self.user

                    if not self.user.is_active:
                        err = forms.ValidationError(
                            'Your account is inactive.'
                        )
                        self.add_error('password', err)
                else:
                    raise forms.ValidationError(self.error_messages['not_validating'])
                self.user.backend = 'django.contrib.auth.backends.ModelBackend'
            else:
                raise forms.ValidationError(self.error_messages['not_validating'])
        else:
            raise forms.ValidationError('')
        return self.cleaned_data


class AuthenticationForm(LoginFormMixin, CoreAuthenticationForm):
    username = forms.EmailField(
        label='email',
        max_length=255,
        required=True,
        widget=forms.TextInput(attrs={'class': 'formControl sizeM floatlabel', 'placeholder': 'Email'})
    )
    password = forms.CharField(
        label='password',
        max_length=255,
        required=True,
        widget=forms.PasswordInput(attrs={'class': 'formControl sizeM floatlabel', 'placeholder': "Password"})
    )


class ResetForm(forms.Form):
    email = forms.CharField(label='Email', max_length=255, required=True, widget=forms.TextInput(
            attrs={'class': 'formControl sizeM floatlabel'}), )

    def clean_email(self):
        email = self.cleaned_data.get('email', '')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            not_exists = 'The account that you tried to reach does not exist.'
            raise forms.ValidationError(not_exists, code='not_exists')
        if not user.is_active:
            not_active = 'This account does not activated yet.'
            raise forms.ValidationError(not_active, code='not_active')
        return email


class RegisterForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)
        if 'data' in kwargs and 'is_social' in kwargs['data']:
            self.fields['password'].required = False
            self.fields['repeat_password'].required = False

    email = forms.EmailField(max_length=32, required=True, widget=forms.TextInput(
            attrs={'class': 'formControl', 'placeholder': 'Email'}))
    first_name = forms.CharField(max_length=32, required=True, validators=[alphanumeric], widget=forms.TextInput(
            attrs={'class': 'formControl', 'placeholder': 'First Name'}))
    last_name = forms.CharField(max_length=32, required=True, validators=[alphanumeric], widget=forms.TextInput(
            attrs={'class': 'formControl', 'placeholder': 'Last Name'}))
    password = forms.CharField(max_length=15, required=True, widget=forms.PasswordInput(
            attrs={'class': 'formControl', 'placeholder': 'Password'}))
    repeat_password = forms.CharField(max_length=15, required=True, widget=forms.PasswordInput(
            attrs={'class': 'formControl', 'placeholder': 'Repeat password'}))

    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'auth_key')

    def clean(self):
        error_messages = {
            'not_match': 'Password and Repeat Password fields must match.',
            'unique_email': 'This email already in use.'
        }
        cleaned_data = super(RegisterForm, self).clean()
        password = cleaned_data.get('password')
        repeat_password = cleaned_data.get('repeat_password')
        email = cleaned_data.get('email')

        if password != repeat_password:
            err = forms.ValidationError(error_messages['not_match'])
            self.add_error('password', err)

        if email:
            user = User.objects.filter(email=email).exists()
            if user:
                err = forms.ValidationError(error_messages['unique_email'])
                self.add_error('email', err)
            cleaned_data['auth_key'] = generate_activation_key(email)


class UserCreationForm(CoreUserCreationForm):

    def __init__(self, *args, **kwargs):
        super(UserCreationForm, self).__init__(*args, **kwargs)

        if self.instance.pk:
            self.fields['password1'].required = False
            self.fields['password2'].required = False

        self.fields['first_name'].required = True
        self.fields['last_name'].required = True
        self.fields['email'].required = True


class ChangePassForm(forms.Form):
    password = forms.CharField(
        max_length=255,
        widget=forms.PasswordInput(attrs={'class': 'formControl'}),
        required=True
    )
    repeat_password = forms.CharField(
        max_length=255,
        widget=forms.PasswordInput(attrs={'class': 'formControl'}),
        required=True
    )

    def clean(self):
        error_messages = {
            'not_match': 'Password and Repeat Password fields must match.',
        }
        cleaned_data = super(ChangePassForm, self).clean()
        password = cleaned_data.get('password')
        repeat_password = cleaned_data.get('repeat_password')
        if password != repeat_password:
            err = forms.ValidationError(error_messages['not_match'])
            self.add_error('password', err)

    def update_pass(self, user, password):
        user.set_password(password)
        user.auth_key = None
        user.save()


class AccountUpdateForm(forms.ModelForm):

    # def __init__(self, *args, **kwargs):
    #     super(AccountUpdateForm, self).__init__(*args, **kwargs)

    first_name = forms.CharField(required=True, validators=[alphanumeric], widget=forms.TextInput(
            attrs={'class': 'formControl'}), )
    last_name = forms.CharField(required=True, validators=[alphanumeric], widget=forms.TextInput(
            attrs={'class': 'formControl'}), )
    email = forms.EmailField(required=True, widget=forms.TextInput(
            attrs={'class': 'formControl'}), )
    username = forms.CharField(required=True, widget=forms.TextInput(
            attrs={'class': 'formControl'}), )
    phone_number = forms.CharField(required=True, validators=[phone_number], widget=forms.TextInput(
            attrs={'class': 'formControl'}), )
    password = forms.CharField(required=False, widget=forms.PasswordInput(
            attrs={'class': 'formControl'}), )
    password_repeat = forms.CharField(required=False, widget=forms.PasswordInput(
            attrs={'class': 'formControl'}), )
    image = forms.ImageField(required=False, widget=forms.ClearableFileInput(
            attrs={'class': 'formControl'}), )

    def clean(self):

        password = self.cleaned_data.get('password')
        password_repeat = self.cleaned_data.get('password_repeat')

        if password and password != password_repeat:
            raise forms.ValidationError("Passwords don't match")

        return self.cleaned_data

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username', 'phone_number', 'image', )
