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

    def __unicode__(self):
        return self.name


class Rating(models.Model):
    STARS_CHOICES = (
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
    )
    restaurant = models.ForeignKey(Restaurant)
    category = models.ForeignKey(Category)
    value = models.IntegerField(choices=STARS_CHOICES)
