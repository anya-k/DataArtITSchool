from django.conf.urls import patterns, url

from restaurant import views

urlpatterns = patterns('',
    url(r'^$', views.RestaurantListView.as_view(), name='index'),
    url(r'^(?P<pk>\d+)/$', views.RestaurantDetailView.as_view(), name='detail'),
    url(r'^add_rest/$', views.RestaurantCreateView.as_view(), name='add_rest'),
    url(r'^edit_rest/(?P<pk>\d+)/$', views.RestaurantUpdateView.as_view(), name='edit_rest'),
    url(r'^delete_rest/(?P<pk>\d+)/$', views.RestaurantDeleteView.as_view(), name='delete_rest'),
    url(r'^add_rest2/$', views.submit_rest, name='add_rest2'),
)
