import sys
sys.path.append("/home/shruti/cWork/college/BE PROJECT/Git2/Podfast/Backend/podcastrecommender")

from utils import *
from bson.objectid import ObjectId

def jaccard_similarity(l1, l2) -> float:
    s1 = set(l1)
    s2 = set(l2)
    return float(len(s1.intersection(s2)) / len(s1.union(s2)))

def rec(id1) -> dict:
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
    dict1={}
    for r in viewedpodcasts:
        # x = r['viewedpodcasts'][0]['categories']
        dict1[str(r['viewedpodcasts'][0]['_id'])]=r['viewedpodcasts'][0]['categories']
    # print(dict1)

    collection_podcast = db["podcasts"]
    allpodcastscategories = collection_podcast.find({},{'categories':1})

    dict2 = {}
    for ap in allpodcastscategories:
        # print (ap)
        dict2[str(ap['_id'])] = ap.get('categories')
    # print(dict2)

    recommendedPodcasts = {}
    THRESHOLD = 0.8
    for alkey,alvalue in dict2.items():
        max_similarity = 0
        for wkey,wvalue in dict1.items():
            # Calculate the similarity between watched_podcast and all unwatched podcasts
            if alvalue:
                similarity = jaccard_similarity(alvalue, wvalue)
                # print(similarity)
                if similarity >= max_similarity:
                    max_similarity = similarity
                # early stop if the unwatched_podcast is similar enough
                if max_similarity >= THRESHOLD:
                    break
                # If unwatched_podcast is similar enough to watched podcasts
                # Then recommend it
        if max_similarity > THRESHOLD:
            # recommendedPodcastids.append(alkey)
            # print("yo")
            # print(alkey)
            recommendedPodcasts[alkey] = alvalue


    # print(recommendedPodcasts)
    return recommendedPodcasts


# # python manage.py make_recommendations




