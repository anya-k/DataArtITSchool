from django.shortcuts import render
from models import Restaurant
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
import logging
logger = logging.getLogger(__name__)


class RestaurantListView(ListView):
    model = Restaurant
    context_object_name = "object_restaurants"

    def get_context_data(self, **kwargs):
        # Here you can add any additional context items.
        context = super(RestaurantListView, self).get_context_data(**kwargs)
        context['var'] = 2
        return context

class RestaurantDetailView(DetailView):
    model = Restaurant

