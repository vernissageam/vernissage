# -*- coding: utf-8 -*-


from django.conf.urls import url

from . import views

urlpatterns = [
    # url(r'^update/(?P<pk>\d+)', views.ShopUpdateView.as_view(), name='update'),
    url(r'^list/$', views.ProductsListView.as_view(), name='list'),
    url(r'^view/(?P<pk>\d+)/$', views.ProductDetailView.as_view(), name='view'),
    url(r'^wish_list/$', views.WishListView.as_view(), name='wish_list'),
    url(r'^cart/$', views.CartView.as_view(), name='cart'),
    url(r'^add_to_cart/(?P<product_id>\d+)', views.AddToCart.as_view(), name='add_to_cart'),
    url(r'^remove_from_cart/(?P<product_id>\d+)', views.RemoveFromCart.as_view(), name='remove_from_cart'),
]
