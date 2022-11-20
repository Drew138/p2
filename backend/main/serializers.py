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
            'quimico_report',
            'bio_y_cor_report',
            'ord_y_rec_report',
            'year',
        ]
