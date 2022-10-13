from rest_framework import routers
from .views import FileViewSet, ReportViewSet

router = routers.DefaultRouter()
router.register('file', FileViewSet, 'image')
router.register('report', ReportViewSet, 'consolidated')

urlpatterns = router.urls
