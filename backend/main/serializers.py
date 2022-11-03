from rest_framework import serializers
from .models import File, Report


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = [
            'name',
            'image',
            'user',
        ]


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'
