# -*- coding: utf-8 -*-


from django.views.generic import ListView, DetailView
from django.views.generic.edit import UpdateView
from django.core.urlresolvers import reverse_lazy
from django.db.models import Count, Case, When
from django.shortcuts import get_object_or_404

from .models import Shop
from .forms import ShopForm


# TODO seller type required
class ShopUpdateView(UpdateView):
    model = Shop
    success_url = reverse_lazy('pages:home')
    template_name = 'shops/update.html'
    form_class = ShopForm

    def get_object(self):
        return get_object_or_404(self.model, pk=self.request.user.shop.id)


class ShopsListView(ListView):
    model = Shop
    template_name = 'shops/list.html'
    context_object_name = 'shop_list'
    paginate_by = 20

    def get_queryset(self):
        shops = Shop.objects.all()
        shops = shops.annotate(is_favorite=Count(Case(When(favorite_shops__id=self.request.user.id, then=1))))

        return shops


# TODO buyer type required
class FavoriteShopsListView(ShopsListView):

    def get_queryset(self):
        shops = self.request.user.favorite_shops.all()
        shops = shops.annotate(is_favorite=Count('id'))

        return shops


class ShopDetailView(DetailView):
    model = Shop
    template_name = 'shops/view.html'
    context_object_name = 'shop'

    def get_object(self, queryset=None):
        shop = Shop.objects.annotate(is_favorite=Count(Case(When(favorite_shops__id=self.request.user.id, then=1))))
        shop = get_object_or_404(shop, pk=self.kwargs['pk'])

        return shop
