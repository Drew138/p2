from rest_framework import viewsets
from .models import File, Report
from .serializers import FileSerializer, ReportSerializer
from django_filters.rest_framework import DjangoFilterBackend


class FileViewSet(viewsets.ModelViewSet):

    serializer_class = FileSerializer
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        return File.objects.all()


class ReportViewSet(viewsets.ModelViewSet):

    serializer_class = ReportSerializer
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        return Report.objects.all()
