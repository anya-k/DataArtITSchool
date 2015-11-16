from django.contrib import admin

from models import Restaurant, Photo


class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 0

class RestaurantAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_display = ('name', )
    inlines = [PhotoInline]


admin.site.register(Photo)
admin.site.register(Restaurant, RestaurantAdmin)
