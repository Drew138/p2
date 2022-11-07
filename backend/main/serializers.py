from rest_framework import serializers
from .models import File, Report


class FileSerializer(serializers.ModelSerializer):
    transcript = serializers.ReadOnlyField(
        source='file.transcript',
        required=False,
        allow_null=True
    )

    class Meta:
        model = File
        fields = [
            'pk',
            'modified',
            'image',
            'user',
            'transcript',
        ]


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = [
            'pk',
            'modified',
            'name',
            'report',
        ]
