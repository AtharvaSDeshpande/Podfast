import csv
import pandas as pd
from django.core.management import BaseCommand
from ...models import Podcast

class Command(BaseCommand):
    help = 'Load a podcast csv file into the database'

    def add_arguments(self, parser):
        parser.add_argument('--path', type=str)

    def handle(self, *args, **kwargs):
        # Remove any existing data
        print("Clean old podcast data")
        Podcast.objects.all().delete()
        path = kwargs['path']
        # Read the podcast csv file as a dataframe
        podcast_df = pd.read_csv(path, lineterminator='\n')
        # Iterate each row in the dataframe
        for index, row in podcast_df.iterrows():
            uuid = row["uuid"]
            categories = row["categories"]
            pub_date = row["pub_date"]
            author = row["author"]
            title_x = row["title_x"]
            description_x = row["description_x"]
            audio_length = row["audio_length"]
            image = row["image"]
            audio = row["audio"]
            tag = row["tags"]
            # Populate Podcast object for each row
            podcast = Podcast(uuid=uuid,
                            categories=categories,
                            title_x=title_x,
                            author=author,
                            pub_date=pub_date,
                            description_x=description_x,
                            audio_length=audio_length,
                            image=image,
                            audio=audio,
                            tags = tag)
            # Save podcast object
            podcast.save()
            print(f"Podcast: {uuid}, {title_x} saved...")

# python manage.py load_podcasts --path poddf1.csv