from rest_framework import serializers
from .models import File, Report


class FileSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = [
            'pk',
            'modified',
            'image',
            'transcript',
        ]


class ReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Report
        fields = [
            'pk',
            'report',
            'year',
        ]
