from django.db import models
from rating.models import Rating


class Restaurant(models.Model):
    name = models.CharField(max_length=60)
    text_review = models.TextField()
    # position = models

    def __unicode__(self):
        return self.name

    def get_full_rating(self):
        cur_rating = Rating.objects.get(pk=self.id)
        #if cur_rating:



class Photo(models.Model):
    restaurant = models.ForeignKey(Restaurant)
    photo = models.ImageField()

    def __unicode__(self):
        return self.restaurant.name



