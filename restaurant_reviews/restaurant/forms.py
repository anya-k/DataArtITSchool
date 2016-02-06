from django import forms
from django.forms.models import inlineformset_factory
from restaurant.models import Restaurant
from rating.models import Rating


class RestaurantForm(forms.ModelForm):
    class Meta:
        model = Restaurant
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(RestaurantForm, self).__init__(*args, **kwargs)
        #fields['photo'] =


RestaurantFormSet = inlineformset_factory(
    Restaurant,
    Rating,
    extra=0,
    can_delete=False,
    exclude=('restaurant',)
)