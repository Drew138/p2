from django import forms
from .models import Anuncio, Entrega, Pregunta

class EntregaForm(forms.Form):
    
    class Meta:
        model = Entrega
        fields = '__all__'

class AnuncioForm(forms.Form):
    
    class Meta:
        model = Anuncio
        fields = '__all__'
        
class PreguntaForm(forms.Form):
    
    class Meta:
        model = Pregunta
        fields = '__all__'


