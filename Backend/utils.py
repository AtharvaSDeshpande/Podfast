import pymongo
from django.conf import settings
def demo():
    connect_string = 'mongodb+srv://atharvasd14:6IoJbs4HD0uj7JiE@podfast.prsoq.mongodb.net/PodFastDatabase?retryWrites=true&w=majority'

    my_client = pymongo.MongoClient(connect_string)

    # First define the database name
    dbname = my_client['myFirstFastDatabase']

    # Now get/create collection name (remember that you will see the database in your mongodb cluster only after you create a collection
    #collection_name = dbname["views"]

    return dbname