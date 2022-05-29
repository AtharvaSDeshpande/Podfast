import pymongo
from django.conf import settings
def demo():
    connect_string = '' #ADD YOUR CONNECTION STRING HERE

    my_client = pymongo.MongoClient(connect_string)

    # First define the database name
    dbname = my_client['PodFastDatabase']

    # Now get/create collection name (remember that you will see the database in your mongodb cluster only after you create a collection
    #collection_name = dbname["views"]

    return dbname