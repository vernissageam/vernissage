# -*- coding: utf-8 -*-


from django.conf.urls import url

from . import views

urlpatterns = [
    # url(r'^update/(?P<pk>\d+)', views.ShopUpdateView.as_view(), name='update'),
    url(r'^list/$', views.ProductsListView.as_view(), name='list'),
    url(r'^wish_list/$', views.WishListView.as_view(), name='wish_list'),
    url(r'^cart/$', views.CartView.as_view(), name='cart'),
    url(r'^add_to_cart/(?P<product_id>\d+)', views.AddToCart.as_view(), name='add_to_cart'),
    url(r'^remove_from_cart/(?P<product_id>\d+)', views.RemoveFromCart.as_view(), name='remove_from_cart'),
    url(r'^my_products/$', views.MyProductsView.as_view(), name='my_products'),
    url(r'^shop_products/(?P<pk>\d+)/$', views.ShopProductsView.as_view(), name='shop_products'),

    # C-R-U-D
    url(r'^view/(?P<pk>\d+)/$', views.ProductDetailView.as_view(), name='view'),
    url(r'^create/$', views.ProductCreate.as_view(), name='create'),
    url(r'^delete/(?P<pk>\d+)/$', views.ProductDelete.as_view(), name='delete'),
    url(r'^update/(?P<pk>\d+)/$', views.ProductUpdate.as_view(), name='update'),
]

