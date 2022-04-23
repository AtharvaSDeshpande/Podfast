from django.shortcuts import render
from .data_management import DataManager
from django.http import HttpResponse
from django.http import JsonResponse
import json
from json import dumps
import pandas as pd


# Create your views here.
def home(request,id,comment):
    print("hello")
    print(comment)
    # df = pd.DataFrame({'genre':'','reviews':comment},index =[0])
    data_manager = DataManager(comment)
    data_manager.initiate_cleaning()
    sentiment = data_manager.get_result()
    result = json.dumps(sentiment)
    print(sentiment)
    return HttpResponse(result)