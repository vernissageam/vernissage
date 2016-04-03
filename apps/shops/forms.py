# -*- coding: utf-8 -*-


from django import forms

from .models import Shop, ShopCategory


class ShopForm(forms.ModelForm):

    name = forms.CharField(max_length=32, required=True, widget=forms.TextInput(
            attrs={'class': 'formControl', 'placeholder': 'Shop name'}))
    description = forms.CharField(max_length=500, required=True, widget=forms.Textarea(
            attrs={'class': 'formControl', 'placeholder': 'Shop description'}))
    categories = forms.ModelMultipleChoiceField(required=False, queryset=ShopCategory.objects.all(),
                                                widget=forms.SelectMultiple(attrs={}))

    class Meta:
        model = Shop
        fields = ('name', 'description', 'categories')
