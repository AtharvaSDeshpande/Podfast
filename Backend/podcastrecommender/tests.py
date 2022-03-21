from django.test import TestCase
from .models import Podcast

# Create your tests here.

class PodcastTestCase(TestCase):

    def setUp(self):
        pass

    # python manage.py test podcastrecommender.tests.PodcastTestCase
    # ./manage.py test
    def test_podcast(self):
        john = Podcast.objects.get(title_x="SoundtrackAlley")
        print(john)
