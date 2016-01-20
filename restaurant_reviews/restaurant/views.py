from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy
import logging
logger = logging.getLogger(__name__)
from models import Restaurant
from forms import RestaurantForm, RestaurantFormSet


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
    formset_class = RestaurantFormSet
    success_url = reverse_lazy('restaurant:index')


def submit_rest(request):
    if request.POST:
        form = RestaurantForm(request.POST)
        if form.is_valid():
            saved_rest = form.save(commit=False)
            rest_formset = RestaurantFormSet(request.POST, instance=saved_rest)
            if rest_formset.is_valid():
                saved_rest.save()
                rest_formset.save()
                # return HttpResponseRedirect(reverse('recipes_submit_posted'))
    else:
        form = RestaurantForm()
        rest_formset = RestaurantFormSet(instance=Restaurant())
    return render_to_response("restaurant/restaurant_form.html", {
        "form": form,
        "rest_formset": rest_formset,
    }, context_instance=RequestContext(request))


class RestaurantUpdateView(UpdateView):
    model = Restaurant


class RestaurantDeleteView(DeleteView):
    model = Restaurant
