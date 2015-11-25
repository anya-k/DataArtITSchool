from django.shortcuts import render
from models import Restaurant
from django.views.generic.list import ListView
import logging
logger = logging.getLogger(__name__)


class RestaurantListView(ListView):
    model = Restaurant



