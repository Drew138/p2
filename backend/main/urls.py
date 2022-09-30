from rest_framework import routers
from .views import ImageViewSet, ConsolidatedViewSet

router = routers.DefaultRouter()
router.register('image', ImageViewSet, 'image')
router.register('consolidated', ConsolidatedViewSet, 'consolidated')

urlpatterns = router.urls
