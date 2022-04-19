# import sys
# sys.path.append("/home/shruti/cWork/college/BE PROJECT/Git2/Podfast/Backend/podcastrecommender/management")
from .management.commands.make_recommendations import *

from django.shortcuts import render
from . import views
from .models import Podcast
from rest_framework import generics
from .serializers import PodSerializer
import json
from json import dumps
import requests
from django.http import HttpResponse
# from rest_framework.response import Response


def generate_podcasts_context():
    context = {}
    # Show only podcasts in recommendation list
    # Sorted by vote_average in desc
    # Get recommended podcast counts
    recommended_count = Podcast.objects.filter(
        recommended=True
    ).count()
    # If there are no recommended podcasts
    if recommended_count == 0:
        # Just return the top voted and unwatched podcasts as popular ones
        podcasts = Podcast.objects.filter(
            watched=False
        ).order_by('-audio_length')[:30]
    else:
        # Get the top voted, unwatched, and recommended podcasts
        podcasts = Podcast.objects.filter(
            watched=False
        ).filter(
            recommended=True
        ).order_by('-audio_length')[:30]
    context['podcast_list'] = podcasts
    return podcasts

def DemoView(request,id):
    # print ("hello"+ id)
    result = {}
    result = rec(id)
    data = request.GET
    keys = result.keys()
    print (keys)
    result = []
    for i in keys:
        result.append({
            "id": i
        })
    response = json.dumps(result)
    print (response)
    
    return HttpResponse(response)

    # return render (request, "http://localhost:3000/explore", {
    #     'data_response': result
    # })
# def get(self, request, *args, **kwargs):
#   data = request.GET
#   return self._handle_request(data, requests.post)

# def _handle_request(self, data, make_request):
#   data = {"hello": "world"}
#   response = make_request("http://localhost:3000", data=data)
#   return HttpResponse(response)

# Create your views here.
# new view to transfer data
class PodcastRecommendationView(generics.ListAPIView):
    queryset = generate_podcasts_context()
    serializer_class = PodSerializer
    


#not needed anymore
# HINT: Create a view to provide movie recommendations list for the HTML template
def podcast_recommendation_view(request):
    if request.method == "GET":
      # The context/data to be presented in the HTML template
      context = generate_podcasts_context()
      # Render a HTML page with specified template and context
      return render(request, 'podcastrecommender/podcast_list.html', context)
      #return render(request, 'http://localhost:3000/explore', context)


