import sys
sys.path.append("/home/shruti/cWork/college/BE PROJECT/Git2/Podfast/Backend/podcastrecommender")

from django.core.management import BaseCommand
from ...models import Podcast
from djongo import models
from utils import *

database = demo()
collection_name = database["views"]
details = collection_name.find({})
# Print on the terminal
# for r in details:
#     print(r)



# Check if genres are valid
def check_valid_categories(categories: str) -> bool:
    if bool(categories and not categories.isspace()) and categories != 'na':
        return True
    else:
        return False

# Add a Jaccard similarity method here
# Method to calculate Jaccard Similarity
def jaccard_similarity(list1: list, list2: list) -> float:
    s1 = set(list1)
    s2 = set(list2)
    return float(len(s1.intersection(s2)) / len(s1.union(s2)))

# Add a podcast similarity method here
# Calculate the similarity between two podcasts
def similarity_between_podcasts(podcast1: Podcast, podcast2: Podcast) -> float:
    if check_valid_categories(podcast1.categories) and check_valid_categories(podcast2.categories):
        p1_categories = podcast1.categories.split()
        p2_categories = podcast2.categories.split()
        return jaccard_similarity(p1_categories, p2_categories)
    else:
        return 0

def rec():
    print ("haaaaaaaaaaaaaaaaaaaha")
    THRESHOLD = 0.8
    # Get all watched and unwatched podcasts
    watched_podcasts = Podcast.objects.filter(watched=True)   #take from array of that user
    print (watched_podcasts)
    # demo = Views1.objects.all()
    # print (demo)
    unwatched_podcasts = Podcast.objects.filter(watched=False)
    # Start to generate recommendations in unwatched podcasts
    for unwatched_podcast in unwatched_podcasts:
        max_similarity = 0
        will_recommend = False
        # For each watched podcast
        for watched_podcast in watched_podcasts:
            # Calculate the similarity between watched_podcast and all unwatched podcasts
            similarity = similarity_between_podcasts(unwatched_podcast, watched_podcast)
            if similarity >= max_similarity:
                max_similarity = similarity
            # early stop if the unwatched_podcast is similar enough
            if max_similarity >= THRESHOLD:
                break
        # If unwatched_podcast is similar enough to watched podcasts
        # Then recommend it
        if max_similarity > THRESHOLD:
            will_recommend = True
            print(f"Find a podcast recommendation: {unwatched_podcast.title_x}")

        unwatched_podcast.recommended = will_recommend
        unwatched_podcast.save()


    
        


# python manage.py make_recommendations




