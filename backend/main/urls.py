from rest_framework import routers
from django.urls import path, re_path, include
from .views import (ClaseView, AnuncioView, EntregaView, PreguntaView, UserView)

router = routers.DefaultRouter()
router.register('clase', ClaseView, 'clase') # ?
router.register('entrega', EntregaView, 'entrega')
router.register('anuncio', AnuncioView, 'anuncio')
router.register('pregunta', PreguntaView, 'pregunta')
router.register('user', UserView, 'user')


urlpatterns = [
]

urlpatterns = router.urls