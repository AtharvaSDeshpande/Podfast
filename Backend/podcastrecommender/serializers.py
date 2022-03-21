from rest_framework import serializers

from .models import Podcast

class PodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Podcast
        fields = ["uuid","title_x","description_x","image","audio","categories","author","pub_date"]