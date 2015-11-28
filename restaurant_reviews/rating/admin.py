from django.contrib import admin
from models import Category, Rating


class RatingAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_display = ['restaurant', 'category', 'value']

admin.site.register(Category)
admin.site.register(Rating, RatingAdmin)
