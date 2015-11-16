from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from restaurant.models import Restaurant


class Category(models.Model):
    name = models.CharField(max_length=30)
    percent_importance = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(100)
        ])


class Rating(models.Model):
    restaurant = models.ForeignKey(Restaurant)
    category = models.ForeignKey(Category)
    value = models.IntegerField(choices=[range(1, 5)])