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

#     0   podcast_uuid   635153 non-null  object
#  1   title_x        635152 non-null  object
#  2   image          635153 non-null  object
#  3   description_x  627625 non-null  object
#  4   language       635153 non-null  object
#  5   categories     635153 non-null  object
#  6   website        625656 non-null  object
#  7   author         635153 non-null  object
#  8   itunes_id      635153 non-null  int64 
#  9   title_y        635010 non-null  object
#  10  audio          635153 non-null  object
#  11  audio_length   635153 non-null  int64 
#  12  description_y  574066 non-null  object
#  13  pub_date       635153 non-null  object
#  14  uuid           635153 non-null  object
