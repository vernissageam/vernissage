# -*- coding: utf-8 -*-


from django.http import HttpResponse, Http404
from django.views.generic import View, ListView, DetailView
from django.views.generic.edit import UpdateView, DeleteView, CreateView
from django.core.urlresolvers import reverse_lazy
from django.contrib import messages
from django.db.models import Count, Case, When
from django.shortcuts import get_object_or_404
from braces.views import LoginRequiredMixin

from .models import Product
from .forms import ProductForm
from shops.models import Shop


class ProductsListView(ListView):
    model = Product
    template_name = 'products/list.html'
    context_object_name = 'product_list'
    paginate_by = 20

    def get_queryset(self):
        products = Product.objects.all()

        if self.request.user.is_authenticated() and self.request.user.type == 'buyer':
            products = products\
                .annotate(is_wish=Count(Case(When(wish_products__id=self.request.user.id, then=1))))\
                .annotate(is_in_cart=Count(Case(When(
                    id__in=self.request.user.cart.products.values_list('id', flat=True), then=1))))

        return products


# TODO buyer type required
class WishListView(LoginRequiredMixin, ProductsListView):

    def get_queryset(self):
        products = self.request.user.wish_products.all()\
            .annotate(is_wish=Count('id'))\
            .annotate(is_in_cart=Count(Case(When(
                id__in=self.request.user.cart.products.values_list('id', flat=True), then=1))))

        return products


# TODO buyer type required
class CartView(LoginRequiredMixin, ProductsListView):

    def get_queryset(self):
        cart = self.request.user.cart.products\
            .annotate(is_wish=Count(Case(When(wish_products__id=self.request.user.id, then=1))))\
            .annotate(is_in_cart=Count('id'))

        return cart


class ShopProductsView(ProductsListView):

    def get_queryset(self):
        try:
            shop = Shop.objects.get(pk=self.kwargs['pk'])
        except Shop.DoesNotExist:
            raise Http404

        products = shop.product_set\
            .all()\
            .annotate(is_wish=Count(Case(When(wish_products__id=self.request.user.id, then=1))))\
            .annotate(is_in_cart=Count('id'))

        return products


# TODO buyer type required
class AddToCart(LoginRequiredMixin, View):

    def get(self, request, product_id):

        try:
            product = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            return HttpResponse('false')

        # Allow add/remove to/from cart only BUYERS
        if not request.user.type == 'buyer':
            return HttpResponse('false')

        request.user.cart.products.add(product)

        return HttpResponse('true')


# TODO buyer type required
class RemoveFromCart(LoginRequiredMixin, View):

    def get(self, request, product_id):

        try:
            product = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            return HttpResponse('false')

        request.user.cart.products.remove(product)

        return HttpResponse('true')


# TODO seller type required
class MyProductsView(LoginRequiredMixin, ProductsListView):

    def get_queryset(self):
        products = Product.objects.filter(shop=self.request.user.shop)

        return products


class ProductDetailView(DetailView):
    model = Product
    template_name = 'products/view.html'
    context_object_name = 'product'

    def get_object(self, queryset=None):

        if self.request.user.is_authenticated() and self.request.user.type == 'buyer':
            product = Product.objects\
                .annotate(is_wish=Count(Case(When(wish_products__id=self.request.user.id, then=1))))\
                .annotate(is_in_cart=Count(Case(When(
                    id__in=self.request.user.cart.products.values_list('id', flat=True), then=1))))
            product = get_object_or_404(product, pk=self.kwargs['pk'])
        else:
            product = get_object_or_404(Product, pk=self.kwargs['pk'])

        return product


# TODO seller type required
class ProductCreate(CreateView):
    model = Product
    success_url = reverse_lazy('products:my_products')
    template_name = 'products/create.html'
    form_class = ProductForm

    def form_valid(self, form):
        form.instance.shop = self.request.user.shop
        return super(ProductCreate, self).form_valid(form)


# TODO seller type required
class ProductUpdate(UpdateView):
    model = Product
    success_url = reverse_lazy('products:my_products')
    template_name = 'products/update.html'
    form_class = ProductForm

    def get_object(self, queryset=None):
        return get_object_or_404(self.model, pk=self.kwargs['pk'], shop=self.request.user.shop)


# TODO seller type required
class ProductDelete(DeleteView):
    model = Product
    success_url = reverse_lazy('products:my_products')

    def get_object(self, queryset=None):

        messages.success(self.request, 'Product has been successfully deleted')
        return get_object_or_404(self.model, pk=self.kwargs['pk'], shop=self.request.user.shop)
