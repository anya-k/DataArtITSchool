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
    STARS_CHOICES = (
        ('s1', 1),
        ('s2', 2),
        ('s3', 3),
        ('s4', 4),
        ('s5', 5),
    )
    restaurant = models.ForeignKey(Restaurant)
    category = models.ForeignKey(Category)
    value = models.IntegerField(choices=STARS_CHOICES)