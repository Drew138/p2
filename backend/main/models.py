from django.db import models
from django.db import connection
import io
import cv2
import numpy as np
from django_extensions.db.models import TimeStampedModel
from django.contrib.auth.models import User
import boto3
from django.conf import settings
import threading
# https://docs.aws.amazon.com/textract/latest/dg/detecting-document-text.html


class File(TimeStampedModel):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images')
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    transcript = models.FileField(upload_to='transcript')

    def save(self, *args, **kwargs):
        instance = super().save(*args, **kwargs)
        threading.Thread(target=self.process_image, args=(self,)).start()
        return instance

    def process_image(self):
        img = self.get_image()
        s3 = boto3.resource('s3')
        bucket = settings.AWS_TEXTRACT_BUCKET
        for fragment, count in self.split_image(img):
            fragment.seek(0)
            output_name = f"{count}__{self.name}__.jpg"  # count + name + jpg
            s3.Object(bucket, output_name).upload_fileobj(fragment)
            fragment.close()
            text = self.process_text_detection(output_name)
            txt_buffer = io.BytesIO(text.encode())
            txt_filename = f'{output_name.rstrip(".jpg")}.txt'
            s3.Object(bucket, txt_filename).upload_fileobj(txt_buffer)
        connection.close()

    def get_image(self):
        s3 = boto3.resource('s3')
        bucket = s3.Bucket(settings.AWS_STORAGE_BUCKET_NAME)
        file_buffer = io.BytesIO()
        s3_key = self.image.file.obj.key
        bucket.Object(s3_key).download_fileobj(file_buffer)  # TODO revisar
        np_arr = np.frombuffer(file_buffer.getbuffer(), dtype="uint8")
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        return img

    def split_image(self, img):
        contours = self.apply_filters(img)

        # Sort all the contours by top to bottom.
        coords = []
        for c in contours:
            x, y, w, h = cv2.boundingRect(c)
            coords.append([x, y, w, h])

        # Because of precision, we group the coordinates if they are close to each other (within 10 pixels)
        limit = 10
        ans = []
        last_end = -1
        coords.sort(key=lambda x: (x[1], x[0], x[2], x[3]))

        for i in range(len(coords)):
            start = end = i
            for j in range(i, len(coords)):
                if coords[j][1] - coords[i][1] <= limit:
                    coords[j][1] = coords[i][1]
                    end = j

            if last_end < end:
                last_end = end
                ans.append(coords[start:end + 1])

        count = 0
        for coord in ans:
            # Sort the boxes left to right
            coord.sort(key=lambda x: (x[0], x[1], x[2], x[3]))

            for c in coord:
                x, y, w, h = c
                if (w > h):
                    # Crop
                    count += 1
                    cropped = img[y:y + h, x:x + w]

                    yield io.BytesIO(cv2.imencode('.jpg', cropped)[1].tobytes()), count

    def apply_filters(self, img):
        # Apply filters to image
        img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, img_bin = cv2.threshold(img_gray,
                                   128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        img_bin = cv2.bitwise_not(img_bin)

        # Find vertical lines
        vertical_lines_img = self.get_lines(img_gray, img_bin, 120, 1)

        #  Find horizontal lines
        horizontal_lines_img = self.get_lines(img_gray, img_bin, 40, 0)

        # Find intersection of vertical and horizontal lines
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
        table_segment = cv2.addWeighted(
            vertical_lines_img, 0.5, horizontal_lines_img, 0.5, 0.0)
        table_segment = cv2.erode(cv2.bitwise_not(
            table_segment), kernel, iterations=2)
        _, table_segment = cv2.threshold(
            table_segment, 0, 255, cv2.THRESH_OTSU)

        # Find contours
        contours, _ = cv2.findContours(
            table_segment, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        return contours

    def get_lines(self, img_gray, img_bin, factor, direction):
        kernel_length = (np.array(img_gray).shape[1])//factor
        size = (1, kernel_length) if direction else (kernel_length, 1)
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, size)
        eroded_img = cv2.erode(img_bin, kernel, iterations=3)
        lines = cv2.dilate(eroded_img, kernel, iterations=3)
        return lines

    @staticmethod
    def process_text_detection(document):
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


class Report(TimeStampedModel):
    name = models.CharField(max_length=255)
    report = models.FileField(upload_to='report')

    def generate_consolidated_report(self):
        pass
