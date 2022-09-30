from rest_framework import viewsets
from .models import Image, Consolidated
from .serializers import ImageSerializer, ConsolidatedSerializer
from django_filters.rest_framework import DjangoFilterBackend


class ImageViewSet(viewsets.ModelViewSet):

    serializer_class = ImageSerializer
    filter_backends = [DjangoFilterBackend]


    def get_queryset(self):
        return Image.objects.all()

class ConsolidatedViewSet(viewsets.ModelViewSet):

    serializer_class = ConsolidatedSerializer
    filter_backends = [DjangoFilterBackend]


    def get_queryset(self):
        return Consolidated.objects.all()

