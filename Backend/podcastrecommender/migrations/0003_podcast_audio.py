# Generated by Django 4.0.3 on 2022-03-19 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('podcastrecommender', '0002_alter_podcast_pub_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='podcast',
            name='audio',
            field=models.CharField(max_length=1000, null=True),
        ),
    ]
