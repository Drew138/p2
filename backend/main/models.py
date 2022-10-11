from django.db import models
from django_extensions.db.models import TimeStampedModel
from django.contrib.auth.models import User
from .recognition import process_text_detection


class Image(TimeStampedModel):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images')
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    transcript = models.FileField(upload_to='transcript')


class Consolidated(TimeStampedModel):
    name = models.CharField(max_length=255)
    report = models.FileField(upload_to='report')

    def generate_consolidated_report(self):
        pass
