import sys
from tokenize import String
from numpy import array
sys.path.append("/home/shruti/cWork/college/BE PROJECT/Git2/Podfast/Backend/podcastrecommender")

from utils import *
from bson.objectid import ObjectId

# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import linear_kernel

import nltk
import editdistance
import io
import itertools
import networkx as nx
import os
import pandas as pd
# import matplotlib.pyplot as plt
# from wordcloud import WordCloud

class MyPodcast : 
    id =""
    category = ""
    maxsimilarity = 0.0
    title = ""
    description1 = ""

    def __init__(self, i, c, t, d, s):
        self.id = i
        self.category = c
        self.title = t
        self.description1 = d
        self.maxsimilarity = s
def loadData(id1) :
    db = demo()
    collection_view = db["views"]
    pipeline = [{'$lookup': 
                    {'from' : 'podcasts',
                    'localField' : 'podcastID',
                    'foreignField' : '_id',
                    'as' : 'viewedpodcasts'}},
            
                {'$match':
                    {'userID' : ObjectId(id1)}},
                
                ]

    viewedpodcasts = collection_view.aggregate(pipeline)

    viewPodsObjs = []
    for r in viewedpodcasts:
        # print(r)
        podcast1 = MyPodcast(str(r['viewedpodcasts'][0]['_id']),r['viewedpodcasts'][0]['categories'],r['viewedpodcasts'][0]['title'],r['viewedpodcasts'][0]['description'],0)
        viewPodsObjs.append(podcast1)
        # print(podcast1.category)    
    # for x in viewPodsObjs:
    #     print (x.id  + str(x.maxsimilarity) + x.category + x.title) 
    # print(len(viewPodsObjs))        

    collection_podcast = db["podcasts"]
    allpodcasts = collection_podcast.find({},{'categories':1 , 'title':1 , 'description' : 1})
    allpodsObjs=[]
    for ap in allpodcasts:
        podcast1 = MyPodcast(str(ap['_id']),ap.get('categories'),ap.get('title'),ap.get('description'),0)
        if (podcast1.category) :
            allpodsObjs.append(podcast1)
        else : 
            continue   

    # print("...............")
    # for x in allpodsObjs:
    #     print (x.id  + str(x.maxsimilarity) + x.category + x.title)
    print(len(allpodsObjs))

    return viewPodsObjs,allpodsObjs

def MywordCloud(desc):
    word_cloud1 = WordCloud(collocations = False, background_color = 'white').generate(desc)
    d = list(word_cloud1.words_.keys())
    s = ""
    for x in d[:int(len(d)/3)]:
        s = s + x
    print(s)
    return s

def jaccard_similarity(l1, l2) -> float:
    s1 = set(l1)
    s2 = set(l2)
    # print (str(s1) + " " + str(s2) + " " +str(float(len(s1.intersection(s2)) / len(s1.union(s2)))))
    return float(len(s1.intersection(s2)) / len(s1.union(s2)))

# def vectorize(list1):
#     tf = TfidfVectorizer(analyzer = 'word', ngram_range = (1, 3), min_df = 0, stop_words = "english")
#     tf_idf = tf.fit_transform(list1)
#     return tf_idf

def rec(id1) -> dict:
    viewPodsObjs,allpodsObjs = loadData(id1)

    allpodsObjs1 = allpodsObjs            
    for allpod1 in allpodsObjs[:len(allpodsObjs)]:
        for viewpod1 in viewPodsObjs:                 
            if ((viewpod1.title == allpod1.title)):
                print("hehe" + allpod1.title)
                allpodsObjs1.remove(allpod1)
      
    reclist = []
    # print(str(allpodsObjs1[2].description1))
    # s1 = MywordCloud(str(allpodsObjs1[2].description1))
    
    THRESHOLD = 0.8
    for allpod in allpodsObjs1:
        max_similarity = 0
        for viewpod in viewPodsObjs:
            # Calculate the similarity between watched_podcast and all unwatched podcasts
            # print(type(allpod.description1))
            # s1 = MywordCloud(str(allpod.description1))
            # s2 = MywordCloud(str(viewpod.description1))
            # s1 += str(allpod.category)
            # s2 += str(viewpod.category)
            similarity = jaccard_similarity(allpod.category,viewpod.category)
            # similarity = jaccard_similarity(allpod.category,viewpod.category)
            # print(similarity)
            if similarity >= max_similarity:
                max_similarity = similarity
            # early stop if the unwatched_podcast is similar enough
            if max_similarity >= THRESHOLD:
                break
            # If unwatched_podcast is similar enough to watched podcasts
            # Then recommend it 
        if (max_similarity >= THRESHOLD ):
            # print(max_similarity)
            tempPodcast = MyPodcast(allpod.id,allpod.category,allpod.title,allpod.description1,max_similarity)
            reclist.append(tempPodcast)

    # reclist = sorted(reclist, key=lambda x: x.maxsimilarity,reverse=True)
    # for x in reclist:
    #     print (x.id  + str(x.maxsimilarity) + x.category + x.title)
    # print(len(reclist))

    # print (viewPodsObjs[6].title)
    # print (allpodsObjs[1].title)
    # print (viewPodsObjs[6].title == allpodsObjs[1].title)
    return reclist



# # python manage.py make_recommendations





# {userID : ObjectId('622ae23501ef0ad56bc9d6a2')}







#display array as it is as per maxsimilarity value
#views not updated when played from there




