# -*- coding: utf-8 -*-


from django.contrib import admin

from .models import User
from .forms import UserCreationForm


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    form = UserCreationForm
    list_display = (
        'email', 'first_name', 'last_name'
    )
    fields = (
        'first_name', 'last_name', 'email', 'is_active', 'password1', 'password2',
    )

    def save_model(self, request, obj, form, change):

        # check if password empty then don't change
        if obj.pk:
            orig_obj = User.objects.get(pk=obj.pk)
            if not request.POST['password1']:
                obj.password = orig_obj.password
        else:
            obj.set_password(request.POST['password1'])
        obj.save()
