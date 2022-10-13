from django.db import models
import io
import cv2
import numpy as np
import os
from django_extensions.db.models import TimeStampedModel
from django.contrib.auth.models import User
import boto3
from django.conf import settings
# https://docs.aws.amazon.com/textract/latest/dg/detecting-document-text.html


class File(TimeStampedModel):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images')
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    transcript = models.FileField(upload_to='transcript')

    def process_text_detection(self, document):

        client = boto3.client(
            'textract', region_name=settings.AWS_TEXTRACT_REGION)
        response = client.detect_document_text(
            Document={
                'S3Object': {
                    'Bucket': settings.AWS_TEXTRACT_BUCKET,
                    'Name': document
                }
            })
        blocks = response['Blocks']
        numbers = []
        for block in blocks:
            if 'Text' in block:
                numbers.append(block['Text'])
        return numbers[0] if numbers else ''

    def upload_file(self, file):
        s3 = boto3.resource('s3')
        s3.meta.client.upload_file(file, settings.AWS_TEXTRACT_BUCKET, file)

    def delete_file(self, file):
        s3 = boto3.resource('s3')
        s3.Object(settings.AWS_TEXTRACT_BUCKET, file).delete()

    def process_file(self):
        for img, (x, y) in self.split_image():
            self.upload_file(img)
            self.process_text_detection(img)
            self.delete_file(img)

    def get_image(self):
        pass

    def split_image(self):
        img_path = self.get_image()
        img = cv2.imread(img_path)
        img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        (thresh, img_bin) = cv2.threshold(img_gray,
                                          128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        img_bin = cv2.bitwise_not(img_bin)

        kernel_length_v = (np.array(img_gray).shape[1])//120
        vertical_kernel = cv2.getStructuringElement(
            cv2.MORPH_RECT, (1, kernel_length_v))
        im_temp1 = cv2.erode(img_bin, vertical_kernel, iterations=3)
        vertical_lines_img = cv2.dilate(
            im_temp1, vertical_kernel, iterations=3)

        kernel_length_h = (np.array(img_gray).shape[1])//40
        horizontal_kernel = cv2.getStructuringElement(
            cv2.MORPH_RECT, (kernel_length_h, 1))
        im_temp2 = cv2.erode(img_bin, horizontal_kernel, iterations=3)
        horizontal_lines_img = cv2.dilate(
            im_temp2, horizontal_kernel, iterations=3)

        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
        table_segment = cv2.addWeighted(
            vertical_lines_img, 0.5, horizontal_lines_img, 0.5, 0.0)
        table_segment = cv2.erode(cv2.bitwise_not(
            table_segment), kernel, iterations=2)
        _, table_segment = cv2.threshold(
            table_segment, 0, 255, cv2.THRESH_OTSU)

        contours, _ = cv2.findContours(
            table_segment, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        count = 0
        for c in contours:
            x, y, w, h = cv2.boundingRect(c)
            # if (w > 40 and h > 10) and w > 3 * h:
            count += 1
            cropped = img[y:y + h, x:x + w]
            is_success, buffer = cv2.imencode(".jpg", cropped)
            yield io.BytesIO(buffer)

            # cv2.imwrite("./results/cropped/crop_" + str(count) +
            #             "__" + img_path.split('/')[-1], cropped)
            # cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # cv2.imwrite("./results/table_detect/table_detect__" +
        #             img_path.split('/')[-1], table_segment)
        # cv2.imwrite("./results/bb/bb__" + img_path.split('/')[-1], img)


class Report(TimeStampedModel):
    name = models.CharField(max_length=255)
    report = models.FileField(upload_to='report')

    def generate_consolidated_report(self):
        pass
