from rest_framework import serializers
from .models import Image, Consolidated


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class ConsolidatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consolidated
        fields = '__all__'

