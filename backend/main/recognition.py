import boto3
from django.conf import settings
# https://docs.aws.amazon.com/textract/latest/dg/detecting-document-text.html


def process_text_detection(document):
    client = boto3.client('textract', region_name=settings.TEXTRACT_REGION)
    response = client.detect_document_text(
        Document={
            'S3Object': {
                'Bucket': settings.TEXTRACT_BUCKET,
                'Name': document
            }
        })
    blocks = response['Blocks']
    numbers = []
    for block in blocks:
        if 'Text' in block:
            numbers.append(block['Text'])
    return numbers[0] if numbers else ''
