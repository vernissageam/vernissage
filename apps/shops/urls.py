# -*- coding: utf-8 -*-


from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^update/(?P<pk>\d+)', views.ShopUpdateView.as_view(), name='update'),
    url(r'^list/$', views.ShopsListView.as_view(), name='list'),
    url(r'^view/(?P<pk>\d+)/$', views.ShopDetailView.as_view(), name='view'),
    url(r'^favorite_list/$', views.FavoriteShopsListView.as_view(), name='favorite_list'),
]
