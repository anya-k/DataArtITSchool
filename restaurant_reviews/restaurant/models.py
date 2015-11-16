from django.db import models


class Restaurant(models.Model):
    name = models.CharField(max_length=60)
    text_review = models.TextField()
    # position = models


class Photo(models.Model):
    restaurant = models.ForeignKey(Restaurant)
    photo = models.ImageField()



