from django.shortcuts import render
from models import Restaurant
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
import logging
logger = logging.getLogger(__name__)


class RestaurantListView(ListView):
    model = Restaurant


class RestaurantDetailView(DetailView):
    model = Restaurant

