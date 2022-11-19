from django.db import models
from django.db import connection
import io
import cv2
import numpy as np
from django_extensions.db.models import TimeStampedModel
import boto3
from django.conf import settings
from .managers import UserManager
from django.contrib.auth.models import AbstractUser
from django.core.files.base import ContentFile
from background_task import background
import os
from  django.core.validators import MinValueValidator, MaxValueValidator
import datetime
import pandas as pd
import io   


class User(TimeStampedModel, AbstractUser):
    """Base class for a user"""

    username = None
    email = models.EmailField(unique=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']


class File(TimeStampedModel):
    image = models.ImageField(upload_to='images')
    transcript = models.FileField(upload_to='transcript', null=True)

    def save(self, *args, **kwargs):
        is_create = self.pk is None
        instance = super().save(*args, **kwargs)
        if is_create:
            self.process_image_task(self.id)
        return instance

    def format_file(self, transcripts):
        HEADERS = 6
        CONTENTS = 8

        for i in range(len(transcripts)):
            if 'fecha' in transcripts[i][1].lower():
                transcripts = transcripts[i:]
                break
        
        res = ""

        res += ";".join([x[1].upper() for x in transcripts[:HEADERS]])

        for i in range(HEADERS, len(transcripts), CONTENTS):
            res += "\n"
            res += ";".join([x[1] for x in transcripts[i:i + CONTENTS]])
        
        return res

    def create_file(self, output_name, transcripts):
        formatted_transcripts = self.format_file(transcripts)
        file = ContentFile(formatted_transcripts.encode('utf-8'))
        
        print("FILE: ", file, flush=True)
        # Save the file
        bucket = settings.AWS_STORAGE_BUCKET_NAME
        region = settings.AWS_TEXTRACT_REGION
        
        s3 = boto3.resource('s3')
        s3.Object(bucket, output_name).upload_fileobj(file)
        
        url = f"https://{bucket}.s3.{region}.amazonaws.com/{output_name}"
        
        self.transcript = url
        self.save()

    @staticmethod
    @background()
    def process_image_task(file_id):
        instance = File.objects.filter(id=file_id).first()
        if not instance:
            return
        img = instance.get_image()
        s3 = boto3.resource('s3')
        bucket = settings.AWS_TEXTRACT_BUCKET
        transcripts = []
        file_output_name = f'transcript__{instance.modified}'
        for fragment, count in instance.split_image(img):
            fragment.seek(0)
            # count + name + jpg
            output_name = f"{count}__{instance.modified}__.jpg"
            s3.Object(bucket, output_name).upload_fileobj(fragment)
            fragment.close()
            text = instance.process_text_detection(output_name)
            
            # Transcript
            trans_text = text.replace(" ", "")
            trans_text = trans_text.replace(";", "")
            transcripts.append((count, trans_text))
            
            # Continue
            txt_buffer = io.BytesIO(text.encode())
            txt_filename = f'{output_name.rstrip(".jpg")}.txt'
            s3.Object(bucket, txt_filename).upload_fileobj(txt_buffer)
        connection.close()
        
        transcripts.sort()
        
        instance.create_file(file_output_name, transcripts)

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
        text = []
        for block in blocks:
            if 'Text' in block:
                text.append(block['Text'])
        return ' '.join(text)


class Report(TimeStampedModel):
    quimico_report = models.FileField(upload_to='report')
    bio_y_cor_report = models.FileField(upload_to='report')
    ord_y_rec_report = models.FileField(upload_to='report')
    year = models.IntegerField(validators=[MinValueValidator(2015), MaxValueValidator(datetime.datetime.now().year)])

    def save(self, *args, **kwargs):
        instance = super().save(*args, **kwargs)
        self.generate_consolidated_report(self.id)
        return instance
    
    def merge_transcripts(self, transcripts):
        HEADERS = transcripts[0].split('\n')[0]
        HEADERS = HEADERS.split(';')[1:]
        HEADERS = ['DIA', 'MES', 'AÑO'] + HEADERS
        HEADERS = ";".join(HEADERS)
        
        for i in range(len(transcripts)):
            cleaned = transcripts[i].split('\n')[1:]
            transcripts[i] = '\n'.join(cleaned)
        
        merged_transcript = HEADERS + '\n' + '\n'.join(transcripts)
        
        return merged_transcript
    
    def get_transcripts(self):
        transcripts = File.objects.filter(created__year=self.year)
        transcripts = transcripts.order_by('created')
        transcripts = transcripts.values_list('transcript', flat=True)
        
        if transcripts:
            transcripts = self.merge_transcripts(transcripts)
        else:
            transcripts = ''
        
        return transcripts
    
    def generate_ByC(self, df):
        HEADERS = ['DIA', 'MES', 'TIPO DE RESIDUO', 'CANTIDAD (Kg)', 'PRETRATRAMIENTO', 'TRATAMIENTO O DISPOSICIÓN FINAL', 'COLOR DE BOLSA']
        BODY = ""
        last_month = -1
        tot_bio, tot_corto = 0, 0
        
        for i in range(len(df)):
            dia, mes, biologico, cortopunzante = df.iloc[i]['DIA'], df.iloc[i]['MES'], float(df.iloc[i]['BIOLOGICO']), float(df.iloc[i]['CORTOPUNZANTE'])
            
            if last_month != mes:
                # Add values
                BODY += f"Biosanitarios:;{tot_bio};;Cortopunzantes:;{tot_corto};;;\n"
                BODY += f";;;;;;;\n"
                BODY += f"MES:;{mes};;;;;;\n"
                
                # Set variables
                last_month = mes
                tot_bio, tot_corto = 0, 0
            # Add values
            tot_bio += biologico
            tot_corto += cortopunzante
            
            # Create rows
            line1 = f"{dia};{mes};Biosanitario;{biologico};ZANIT-10;Incineración;Rojo\n"
            line2 = f";;Cortopunzante;{cortopunzante};;Incineración;Guardián\n"
            BODY += line1 + line2
        
        data = ";".join(HEADERS) + '\n' + BODY
        
        file = ContentFile(data)
        output_name = f"{datetime.datetime.now()}-BIOLOGICO_Y_CORTOPUNZANTE.csv"
        self.bio_y_cor_report.save(output_name, file, save=True)
    
    def generate_OyR(self, df):
        HEADERS = ['DIA', 'MES', 'TIPO DE RESIDUO','SALA DE ESPERA Kg', 'ASISTENCIAL','PRETRATRAMIENTO', 'TRATAMIENTO O DISPOSICIÓN FINAL', 'COLOR DE BOLSA']
        BODY = ""
        last_month = -1
        tot_ord, tot_rec = 0, 0
        
        for i in range(len(df)):
            dia, mes, ordinario, reciclable = df.iloc[i]['DIA'], df.iloc[i]['MES'], float(df.iloc[i]['VERDE']), float(df.iloc[i]['GRIS'])
            
            if last_month != mes:
                # Add values
                BODY += f"Ordinarios:;{tot_ord};;Reciclables:;{tot_rec};;;\n"
                BODY += f";;;;;;;\n"
                BODY += f"MES:;{mes};;;;;;\n"
                
                # Set variables
                last_month = mes
                tot_ord, tot_rec = 0, 0
            # Add values
            tot_ord += ordinario
            tot_rec += reciclable
            
            # Create rows
            line1 = f"{dia};{mes};Ordinarios;{ordinario};;Ninguno;;Verde\n"
            line2 = f";;Reciclables;{reciclable};;Ninguno;;Gris\n"
            BODY += line1 + line2
        
        data = ";".join(HEADERS) + '\n' + BODY
        self.save_file('ORDINARIO_Y_RECICLABLE', data)
        
        file = ContentFile(data)
        output_name = f"{datetime.datetime.now()}-ORDINARIO_Y_RECICLABLE.csv"
        self.ord_y_rec_report.save(output_name, file, save=True)
    
    def generate_quimico(self, df):
        HEADERS = ['DIA', 'MES', 'TIPO DE RESIDUO','CANTIDAD (Kg)','PRETRATRAMIENTO', 'TRATAMIENTO O DISPOSICIÓN FINAL', 'COLOR DE BOLSA']
        BODY = ""
        last_month = -1
        total = 0
        
        
        BODY += f";;RESIDUOS AMALGAMA;;GLICERINA;Incineración;Rojo\n"
        BODY += f";;REVELADOR;;;Incineración;Guardián\n"
        BODY += f";;FIJADOR;;;Incineración;Rojo\n"
        
        for i in range(len(df)):
            dia, mes, quimico = df.iloc[i]['DIA'], df.iloc[i]['MES'], float(df.iloc[i]['QUIMICO'])
            
            if last_month != mes:
                # Add values
                BODY += f"TOTAL:;{total};;;;;;\n"
                BODY += f";;;;;;;\n"
                BODY += f"MES:;{mes};;;;;;\n"
                
                # Set variables
                last_month = mes
                total = 0
            # Add values
            total += quimico
            
            # Create rows
            line1 = f"{dia};{mes};RESIDUOS QUIMICOS;{quimico};;Incineración;Rojo\n"
            BODY += line1
        
        data = ";".join(HEADERS) + '\n' + BODY
        self.save_file('RIESGO_QUIMICO', data)
        
        file = ContentFile(data)
        output_name = f"{datetime.datetime.now()}-RIESGO_QUIMICO.csv"
        self.quimico_report.save(output_name, file, save=True)

    @staticmethod
    #@background()
    def generate_consolidated_report(report_id):
        report = Report.objects.filter(id=report_id).first()
        if not report:
            return
        transcripts = report.get_transcripts()
        
        if transcripts:
            transcripts_df = pd.read_csv(io.StringIO(transcripts), sep=";")
            
            fecha = ['DIA', 'MES', 'AÑO']
            ByC_df = transcripts_df[[*fecha, 'BIOLOGICO', 'CORTOPUNZANTE']].copy()
            OyR_df = transcripts_df[[*fecha, 'VERDE', 'GRIS']].copy()
            quimico_df = transcripts_df[[*fecha, 'QUIMICO']].copy()
            
            report.generate_ByC(ByC_df)
            report.generate_OyR(OyR_df)
            report.generate_quimico(quimico_df)

