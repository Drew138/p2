from rest_framework import viewsets
from .models import Image, Consolidated
from .serializers import ImageSerializer, ConsolidatedSerializer

class ImageViewSet(viewsets.ModelViewSet):

    serializer_class = ImageSerializer


    def get_queryset(self):
        return Image.objects.all()

class ConsolidatedViewSet(viewsets.ModelViewSet):

    serializer_class = ConsolidatedSerializer


    def get_queryset(self):
        return Consolidated.objects.all()

