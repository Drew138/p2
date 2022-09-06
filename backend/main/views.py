from .models import (Clase, Anuncio, Entrega, Pregunta, User)
from .serializers import (ClaseSerializer, AnuncioSerializer, EntregaSerializer, PreguntaSerializer, UserSerializer)
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from django.contrib import admin, messages
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate, logout
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings

class UserView(viewsets.ModelViewSet):

    serializer_class = UserSerializer
    # filter_backends = [DjangoFilterBackend]


    def get_queryset(self):
        return User.objects.all() 

class ClaseView(viewsets.ModelViewSet):
    serializer_class = ClaseSerializer
    filter_backends = [DjangoFilterBackend]

    filterset_fields = ['user']
    def get_queryset(self):
        return Clase.objects.all()


    @action(
        methods=['post'],
        detail=False
    )
    def unirse_clase(self, *args, **kwargs):

        try:
            usuario = self.request.data.get('usuario', None)
            clase = self.request.data.get('clase', None)
            usuario_object = User.objects.get(pk=usuario)
            usuario_object.clases.add(clase)
            usuario_object.save()
            return Response({'hola': 'hola'})
        except Exception as err:
            return Response({"error": str(err)}, status=status.HTTP_400_BAD_REQUEST)

class AnuncioView(viewsets.ModelViewSet):
    serializer_class = AnuncioSerializer
    filter_backends = [DjangoFilterBackend]

    filterset_fields = '__all__'

    def get_queryset(self):
        return Anuncio.objects.all()

class EntregaView(viewsets.ModelViewSet):
    serializer_class = EntregaSerializer
    filter_backends = [DjangoFilterBackend]

    filterset_fields = '__all__'
    def get_queryset(self):
        queryset = Entrega.objects.all()
        return queryset

class PreguntaView(viewsets.ModelViewSet):
    serializer_class = PreguntaSerializer
    filter_backends = [DjangoFilterBackend]

    filterset_fields = '__all__'
    def get_queryset(self):
        queryset = Pregunta.objects.all()
        return queryset
