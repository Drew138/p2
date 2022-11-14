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
            'transcript',
        ]


class ReportSerializer(serializers.ModelSerializer):
    quimico_report = serializers.ReadOnlyField(
        source='report.quimico_report',
        required=False,
        allow_null=True
    )

    bio_y_cor_report = serializers.ReadOnlyField(
        source='report.bio_y_cor_report',
        required=False,
        allow_null=True
    )

    ord_y_rec_report = serializers.ReadOnlyField(
        source='report.ord_y_rec_report',
        required=False,
        allow_null=True
    )

    class Meta:
        model = Report
        fields = [
            'pk',
            'modified',
            'name',
            'quimico_report',
            'bio_y_cor_report',
            'ord_y_rec_report',
            'year',
        ]
