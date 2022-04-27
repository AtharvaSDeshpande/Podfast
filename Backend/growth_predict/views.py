from django.shortcuts import render
from .data_management import DataManager
from django.http import HttpResponse
from utils import *
from bson.objectid import ObjectId
import json
from json import dumps
import pandas as pd


# Create your views here.
def home(request,commentId):
    # print("hello")
    print(commentId)
    #get comment from database using commentId
    db = demo()
    collection = db['comments']
    comment = collection.find_one({"_id":ObjectId(commentId)})
    print(comment.get('comment'))
    data_manager = DataManager(comment.get('comment'))
    data_manager.initiate_cleaning()
    sentiment = data_manager.get_result()
    result = json.dumps(sentiment)
    print(sentiment)
    collection.find_one_and_update({"_id":ObjectId(commentId)},{"$set":{"sentiment":sentiment}})
    return HttpResponse(result)