from django.db import models
from rating.models import Rating, Category


class Restaurant(models.Model):
    name = models.CharField(max_length=60)
    text_review = models.TextField()
    # position = models

    def __unicode__(self):
        return self.name

    def get_category_rating(self):
        list_rating = Rating.objects.filter(restaurant=self.id)
        return list_rating

    def get_full_rating(self):
        #list_rating = Rating.objects.filter(restaurant=self.id)
        list_rating = self.get_category_rating()
        result = 0.00
        sum_percent_importance = 0
        for cur_rating in list_rating:
            cur_category = Category.objects.get(id=cur_rating.category.id)
            sum_percent_importance += cur_category.percent_importance
            result += cur_rating.value * cur_category.percent_importance
        result /= sum_percent_importance
        return format(result, '.2f')


class Photo(models.Model):
    restaurant = models.ForeignKey(Restaurant)
    photo = models.ImageField()

    def __unicode__(self):
        return self.restaurant.name
