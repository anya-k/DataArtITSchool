from django.db import models


class Restaurant(models.Model):
    name = models.CharField(max_length=60)
    text_review = models.TextField()
    # position = models

    def __unicode__(self):
        return self.name


class Photo(models.Model):
    restaurant = models.ForeignKey(Restaurant)
    photo = models.ImageField()



