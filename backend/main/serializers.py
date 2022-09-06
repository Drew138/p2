from rest_framework import serializers
from .models import (Clase, Anuncio, Entrega, Pregunta, User)
from django.core.mail import send_mail
from django.conf import settings

class ClaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clase
        fields = '__all__'

class AnuncioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anuncio
        fields = '__all__'

class EntregaSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        clase_val = validated_data.get('clase')
        # print(User.objects.filter(clases_suscritas__id__in=[clase_val.id]))
        # print("val data clase: ", clase_val, flush=True)
        # print("val data clase id: ", clase_val.id, flush=True)
       
        email_users = User.objects.filter(clases_suscritas__id__in=[clase_val.id])
        print("Email users: ", [u.email for u in email_users], flush=True)
        send_mail(f'Nueva Entrega: {validated_data.get("titulo")}', f'Tienes una nueva entrega \n Titulo: {validated_data.get("titulo")} \n Descripcion: {validated_data.get("cuerpo")}', from_email=settings.EMAIL_HOST_USER, recipient_list=[u.email for u in email_users])
        print("sent email", flush=True)
        return super().create(validated_data)


    class Meta:
        model = Entrega
        fields = '__all__'

class PreguntaSerializer(serializers.ModelSerializer):

    respuesta = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Pregunta
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    #primoschuchas22
    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'username', 
            'first_name',
            'last_name',
            'rol',
            'clases',
            'clases_suscritas',
        ]

