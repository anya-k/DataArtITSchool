# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy
from django.http import HttpResponseRedirect
from django.contrib import messages
import logging
logger = logging.getLogger(__name__)
from models import Restaurant
from forms import RestaurantForm, RestaurantFormSet
from rating.models import Category, Rating


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


class RestaurantCreateView(CreateView):
    model = Restaurant
    form_class = RestaurantForm
    success_url = reverse_lazy('restaurant:index')

    # def get(self, request, *args, **kwargs):
    #     """
    #     Handles GET requests and instantiates blank versions of the form
    #     and its inline formsets.
    #     """
    #     self.object = None
    #     form_class = self.get_form_class()
    #     form = self.get_form(form_class)
    #     rest_formset = RestaurantFormSet()
    #     return self.render_to_response(
    #         self.get_context_data(form=form,
    #                               rest_formset=rest_formset))

    def get_context_data(self, **kwargs):
        context = super(RestaurantCreateView, self).get_context_data(**kwargs)
        context['page_title'] = 'Создание'
        context['h3_title'] = 'Создание'
        if self.request.POST:
            context['form'] = RestaurantForm(self.request.POST, instance=self.object)
            context['rest_formset'] = RestaurantFormSet(self.request.POST, instance=self.object)
            context['restaurant'] = self.object
            context['category_all'] = Category.objects.all()
        else:
            self.object = None
            context['form'] = RestaurantForm(instance=self.object)
            context['rest_formset'] = RestaurantFormSet(instance=self.object)
            context['restaurant'] = self.object
            context['category_all'] = Category.objects.all()
        return context

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests, instantiating a form instance and its inline
        formsets with the passed POST variables and then checking them for
        validity.
        """
        self.object = None
        form = RestaurantForm(self.request.POST)
        if form.is_valid():
            saved_rest = form.save(commit=False)
            rest_formset = RestaurantFormSet(self.request.POST, instance=saved_rest)
            if rest_formset.is_valid():
                saved_rest.save()
                rest_formset.save()
                return HttpResponseRedirect(reverse_lazy('restaurant:index'))

    def form_valid(self, form):
        logger.info("Form create restaurant success")
        response = super(RestaurantCreateView, self).form_valid(form)
        messages.success(self.request, u'Rest {0} успешно добавлен'.format(self.object.name))
        return response

    def form_invalid(self, form):
        response = super(RestaurantCreateView, self).form_valid(form)
        logger.error("Form create restaurant invalid!")
        return response


class RestaurantUpdateView(UpdateView):
    model = Restaurant
    form_class = RestaurantForm
    success_url = reverse_lazy('restaurant:index')

    def get_context_data(self, **kwargs):
        context = super(RestaurantUpdateView, self).get_context_data(**kwargs)
        context['page_title'] = 'Редактирование'
        context['h3_title'] = 'Редактирование данных'
        if self.request.POST:
            context['form'] = RestaurantForm(self.request.POST, instance=self.object)
            context['rest_formset'] = RestaurantFormSet(self.request.POST, instance=self.object)
            context['restaurant'] = self.object
            context['category_all'] = Category.objects.all()
        else:
            context['form'] = RestaurantForm(instance=self.object)
            context['rest_formset'] = RestaurantFormSet(instance=self.object)
            context['restaurant'] = self.object
            context['category_all'] = Category.objects.all()
        return context

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        rating_form = Rating(self.request.POST)
        if form.is_valid() and rating_form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

    def form_valid(self, form):
        logger.info("Form update restaurant success")
        response = super(RestaurantUpdateView, self).form_valid(form)
        messages.success(self.request, u'Ресторан {0} успешно изменен'.format(self.object.name))
        return response

    def form_invalid(self, form):
        response = super(RestaurantUpdateView, self).form_valid(form)
        logger.error("Form update restaurant invalid!")
        return response


class RestaurantDeleteView(DeleteView):
    model = Restaurant
    success_url = reverse_lazy('restaurant:index')

