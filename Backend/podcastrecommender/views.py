# import sys
# sys.path.append("/home/shruti/cWork/college/BE PROJECT/Git2/Podfast/Backend/podcastrecommender/management")
from .management.commands.make_recommendations import *

from django.shortcuts import render
import json
from json import dumps
import requests
from django.http import HttpResponse

def DemoView(request,id):
    # print ("hello"+ id)
    result = []
    result = rec(id)
    data = request.GET
    # keys = result.keys()
    # print (keys)
    result1 = []
    for i in result:
        result1.append({
            "id": i.id
        })
    response = json.dumps(result1)
    # print (response)
    
    return HttpResponse(response)


