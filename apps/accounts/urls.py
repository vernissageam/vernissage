# -*- coding: utf-8 -*-


from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^login/$', views.LoginView.as_view(), name='login'),
    url(r'^register_buyer/$', views.RegisterBuyerView.as_view(), name='register_buyer'),
    url(r'^register_seller/$', views.RegisterSellerView.as_view(), name='register_seller'),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/'}, name='logout'),
    url(r'^reset/$', views.ResetPassView.as_view(), name='reset'),
    url(r'^change_pass/(?P<reset_key>\w+)/$', views.ChangePass.as_view(), name='change_pass'),
    url(r'^activate/(?P<activate_key>\w+)/$', views.ActivationView.as_view(), name='activate'),
    url(r'^check_unique_data/', views.CheckUniqueDataView.as_view(), name='check_unique_data'),
]