from django.db import models

# Create your models here.

class Podcast(models.Model):
    """
    Django Podcast Model
    """

    #uuid
    uuid = models.CharField(max_length=250, null=False)

    #podcast title
    title_x = models.CharField(max_length=500, null=False)

    #categories
    categories = models.CharField(max_length=200, null=True)

    #author
    author = models.CharField(max_length = 100, null=True)

    #description
    description_x = models.TextField(max_length=2000, null=True)

    #image
    image = models.CharField(max_length=264, null=True)

    #audio_length
    audio_length = models.IntegerField(default=0)

    #Publication date
    pub_date = models.DateTimeField(default=1970)

    # If you have watched this podcast
    watched = models.BooleanField(default=False, null=True)

    # If this podcast will be recommended
    recommended = models.BooleanField(default=False, null=True)
    
    #audio
    audio = models.CharField(max_length=1000, null=True)



# class Users1(models.Model):
#     #id 
#     _id - models.