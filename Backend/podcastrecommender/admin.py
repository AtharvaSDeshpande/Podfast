from django.contrib import admin

# Register your models here.

from .models import Podcast


class PodcastAdmin(admin.ModelAdmin):
    fields = ['uuid', 'categories', 'title_x', 'description_x', 'watched']
    list_display = ('title_x', 'categories', 'pub_date', 'watched')
    search_fields = ['title_x', 'description_x']


admin.site.register(Podcast, PodcastAdmin)