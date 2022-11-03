from rest_framework import routers
from .views import FileViewSet, ReportViewSet

router = routers.DefaultRouter()
router.register('file', FileViewSet, 'file')
router.register('report', ReportViewSet, 'report')

urlpatterns = router.urls
