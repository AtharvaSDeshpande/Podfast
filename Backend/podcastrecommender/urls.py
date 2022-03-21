from django.urls import path
from . import views


urlpatterns = [
    # route is a string contains a URL pattern
    path(route="api/", view=views.PodcastRecommendationView.as_view(), name='recommendations'),
]
