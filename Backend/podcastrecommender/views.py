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


