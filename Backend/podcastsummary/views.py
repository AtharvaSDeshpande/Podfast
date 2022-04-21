# import sys
# sys.path.append("/home/shruti/cWork/college/BE PROJECT/Git2/Podfast/Backend/podcastrecommender/management")
from .generateSummary import *
from django.shortcuts import render
from . import views
from rest_framework import generics
import json
from json import dumps
import requests
from django.http import HttpResponse
# from rest_framework.response import Response
# dir = 'audio/split'
# for f in os.listdir(dir):
#     os.remove(os.path.join(dir, f))

# dir = 'transcripts'
# for f in os.listdir(dir):
#     os.remove(os.path.join(dir, f))
# dir = 'summary'
# for f in os.listdir(dir):
#     os.remove(os.path.join(dir, f))
    
def SummaryView(request,id):
    # print ("hello"+ id)
    # print(url)
    result = summary(id)
    # result = uploadSumm(id)
    data = request.GET
    response = json.dumps(result)
    print (response)
    
    return HttpResponse(response)


