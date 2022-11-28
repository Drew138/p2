# Info de la materia: ST0258 Proyecto Integrador 2
#
# Estudiante(s): Andres Salazar Galeano, asalaza5@eafit.edu.co - Julian David Ramirez Lopera, jdramirezl@eafit.edu.co - Ana Sofia Arango Gonzalez, asarangog@eafit.edu.co
#
# Profesor: Edwin Nelson Montoya Munera, emontoya@eafit.edu.co
#
# Proyecto Integrador Final TranscriptAI
#
# 1. Breve descripción de la actividad
Transcript AI es la implementación de un software como aplicación web para el consultorio odontológico Julian León Ramirez Zuluaga, el cual recibe y convierte documentos escritos a mano con las tablas sobre los desechos de basura que se generan bi-semanalmente, en archivos de Excel, a través de Inteligencia Artificial.  
El software busca reducir el tiempo de transcripción del registro de basuras bi-semanal que tiene que hacer el consultorio, el cual toma apróximadamente 2 horas a mano.  
Con la solución propuesta, la persona encargada deberá solo escanear las tablas y el software se encargará de transformarlas en archivos de Excel.

## 1.1. Qué aspectos cumplió o desarrolló de la actividad propuesta por el profesor (requerimientos funcionales y no funcionales)
Desarrollo de una página web con registro e inicio de sesión, carga, descarga y edición de documentos, fotos y archivos de Excel.  
Reconocimiento de texto de documentos escritos a mano y conversión a archivos de texto plano y archivos de Excel.  
Despliegue de la aplicación web con dominio propio.

## 1.2. Qué aspectos NO cumplió o desarrolló de la actividad propuesta por el profesor (requerimientos funcionales y no funcionales)
Los procesos de fondo no corren correctamente, se arreglaron unos problemas que habían pero no se logró desplegar.  
Las imágenes se analizan secuencialmente, por lo que el algoritmo no cumple con la eficiencia de tiempo esperada.

# 2. Información general de diseño de alto nivel, arquitectura, patrones, mejores prácticas utilizadas.
### Diagrama de despliegue y tecnología

![image](https://user-images.githubusercontent.com/58788781/197372027-1069c108-2b37-45d0-82f0-7450c853d183.png)

[Link a Lucidchart](https://lucid.app/lucidchart/a26e6175-a1c9-4822-9ebf-0c16f3885f39/edit?viewport_loc=-1565%2C-1253%2C5622%2C2608%2C0_0&invitationId=inv_8d8c8282-7adb-4965-a41c-c551c363a794)

# 3. Descripción del ambiente de desarrollo y técnico: lenguaje de programación, librerias, paquetes, etc, con sus numeros de versiones.
Las principales tecnologías usadas para el desarrollo son las siguientes:  
- Django  
- Django Rest Framework  
- Boto3  
- Pillow  
- OpenCV  
- React  
- Typescript  
- Chakra UI  
- AWS S3  
- AWS RDS  
- AWS Textract  
- Gunicorn  
- Nginx  
- Docker  

Las otras dependencias están mencionadas en el archivo "requirements.txt". Las versiones de cada una de estas son las siguientes:
```
asgiref==3.5.0
certifi==2021.10.8
cffi==1.15.0
charset-normalizer==2.0.12
cryptography==36.0.2
defusedxml==0.7.1
Django==4.0.3
django-allauth==0.49.0
django-bootstrap-modal-forms==2.2.0
django-cors-headers==3.7.0
django-crispy-forms==1.14.0
django-filter==2.4.0
djangorestframework==3.12.4
idna==3.3
oauthlib==3.2.0
psycopg2==2.9.3
pycparser==2.21
PyJWT==2.3.0
python3-openid==3.2.0
pytz==2022.1
requests==2.27.1
requests-oauthlib==1.3.1
sqlparse==0.4.2
tzdata==2022.1
urllib3==1.26.9
djoser==2.1.0
django_extensions==3.1.5
django-filter==2.4.0
Pillow==9.2.0
django-storages==1.12.3
boto3==1.24.2
numpy==1.23.4
opencv-python==4.6.0.66
openpyxl==3.0.10
django-background-tasks-updated==1.2.7
pandas==1.5.0
```

## Cómo se compila y ejecuta
Para realizar desarrollo local, únicamente es necesario ejecutar los siguientes comandos, ya que la aplicación entera se encuentra dockerizada. De este modo se construyen todos los contenedores y dependencias de la aplicación.
```
docker-compose up --build
```

Aparte de esto, para correr los procesos de fondo de manera directa se debe correr el siguiente comando, una vez que la aplicación entera se encuentre desplegada.
```
docker-compose exec django python manage.py process_tasks
```

Cabe aclarar que es necesario contar con un archivo de entorno  `.env` para que estos comandos puedan correr. 

Este archivo debe contar con la siguiente estructura:

```.env
AWS_STORAGE_BUCKET_NAME=AWS_STORAGE_BUCKET_NAME
AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY
AWS_TEXTRACT_BUCKET=AWS_TEXTRACT_BUCKET
AWS_TEXTRACT_REGION=AWS_TEXTRACT_REGION
```

Estos secretos deben ser configurados apropiadamente en AWS para que el proyecto funcione correctamente. Estos hacen referencia los siguientes servicios de este:

- AWS Textract
- Dos buckets de AWS S3
- Una cuenta AMI con acceso a AWS Textract y a AWS S3

## Detalles del desarrollo
Como se había mencionado previamente esta aplicación fue desarrollada tanto en React, como en Django, lo cual implica una separación de la lógica de negocio de la interfaz de usuario. La aplicación consta de un diseño por capas muy similar a MVC (modelo, vista controlador). La única diferencia es que este también depende de otras capas y servicios para funcionar correctamente.

En términos del backend, se implementó el registro de usuarios, inicio de sesión, y las operaciones CRUD tanto para los archivos como para los reportes. En el caso de de los archivos, una vez que estos son creados, se registra un nuevo proceso de fondo que estara encargado de separar la imagen subida en cada una de las celdas de manera que se tengan recortes sobre estas. Posteriormente, cada una de estas imagenes es subida al bucket de S3. Una vez esto este concluido, se itera sobre cada una de las imagenes y se realiza la traducción mediante el servicio de textract para poder generar un archivo csv.

Para los reportes, se cuenta con proceso similar. Cada vez que se genere un reporte para un nuevo año, también se crea un nuevo proceso de fondo que se encarga de filtrar los archivos creados en el respectivo año, y realizar una compilación que incluya las traducciones de cada uno de estos.

Respecto al frontend, se implementaron diferentes vistas para que el usuario pueda accedar a las funcionalidades ya descritas de una manera amigable. Entre estas tenemos: 

- Creación de cuenta.
- Inicio de sesión.
- Página principal:
	- Cuenta con una tabla de archivos la cual permite visualizar, crear, borrar y modificar archivos.
	- Cuenta con una tabla de reportes la cual permite visualizar, crear y borrar reportes.

## Detalles técnicos
- Se utilizó Django para el desarrollo del backend.  
- Se utilizó React y Chakra UI para el desarrollo del frontend.  
- Se utilizó PostgreSQL y AWS RDS como base de datos.  
- Se utilizaron servicios de AWS como S3 y Textract y OpenCV para el procesamiento de imagenes.  
- Se utilizó Nginx y Gunicorn para el despliegue de la aplicación.  
- Se utilizó Docker para el desarrollo de la aplicación.

## Descripción y como se configura los parámetros del proyecto (ej: ip, puertos, conexión a bases de datos, variables de ambiente, parámetros, etc)
Todas las variables de entorno utilizadas en el proyecto se pueden visualizar aquí:

```.env
AWS_STORAGE_BUCKET_NAME=AWS_STORAGE_BUCKET_NAME
AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY
AWS_TEXTRACT_BUCKET=AWS_TEXTRACT_BUCKET
AWS_TEXTRACT_REGION=AWS_TEXTRACT_REGION
REACT_APP_BASE_URL=REACT_APP_BASE_URL
DEBUG=DEBUG
NAME=NAME
USER=USER
PASSWORD=PASSWORD
HOST=HOST
PORT=PORT
```

Aparte de las previamente mencionadas relacionadas a textract y los buckets de aws, es necesario incluir la variable de entorno `REACT_APP_BASE_URL` la cual es utilizada durante el proceso de construcción de la aplicación en React. Las demás, son concernientes a la base de datos en RDS.

# 4. Descripción del ambiente de EJECUCIÓN (en producción) lenguaje de programación, librerias, paquetes, etc, con sus numeros de versiones.
Respecto al ambiente de ejecución de producción, este no varía respecto al de desarrollo. El único cambio fue que las aplicaciones ya no se corren dockerizadas, sino directamente en el servidor. Para el caso del frontend, no se corre el servidor destinado a desarrollo. Se realiza un "build" de la apliación que es posteriromente servida por el servidor de nginx.

De igual manera, para Django, se corre la aplicación a través de Gunicorn, el cual es un servidor WSGI usualmente utilizado para despliegues en Python.

Aparte de esto, se utiliza nginx como proxy inverso para enrutar las peticiones dirigidas al frontend, y las peticiones dirigidas al backend.

# IP o nombres de dominio en nube o en la máquina servidor
En el despliegue se cuenta con las siguientes IPs o nombres de dominio relevantes:

- IP de DCA: 192.168.10.213
* Nombre de dominio de la aplicación: pi2transcriptia.dis.eafit.edu.co
* Bucket de aplicación: arn:aws:s3:::django-bucket-p2
* Bucket de aplicación utilizado para interpretación de imagenes: arn:aws:s3:::textract-bucket-p2

## Descripción y como se configura los parámetros del proyecto (ej: ip, puertos, conexión a bases de datos, variables de ambiente, parámetros, etc)
Todas las variables de entorno utilizadas en el proyecto se pueden visualizar aquí:

```.env
AWS_STORAGE_BUCKET_NAME=AWS_STORAGE_BUCKET_NAME
AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY
AWS_TEXTRACT_BUCKET=AWS_TEXTRACT_BUCKET
AWS_TEXTRACT_REGION=AWS_TEXTRACT_REGION
REACT_APP_BASE_URL=REACT_APP_BASE_URL
DEBUG=DEBUG
NAME=NAME
USER=USER
PASSWORD=PASSWORD
HOST=HOST
PORT=PORT
```

Aparte de las previamente mencionadas relacionadas a textract y los buckets de AWS, es necesario incluir la variable de entorno `REACT_APP_BASE_URL` la cual es utilizada durante el proceso de construcción de la aplicación en React. Las demás, son concernientes a la base de datos en RDS.

## Como se lanza el servidor.
Pasos para correr el proyecto como usuario:

1. Inicialmente se debe instalar docker.
2. Se debe clonar el [repositorio](https://github.com/Drew138/p2) del proyecto.
3. Únicamente es necesario ejecutar los siguientes comandos, ya que la aplicación entera se encuentra dockerizada. De este modo se construyen todos los contenedores y dependencias de la aplicación.
```
docker-compose up --build
```

Aparte de esto, para correr los procesos de fondo de manera directa se debe correr el siguiente comando, una vez que la aplicación entera se encuentre desplegada.
```
docker-compose exec django python manage.py process_tasks
```

Cabe aclarar que es necesario contar con un archivo de entorno  `.env` para que estos comandos puedan correr. 

Este archivo debe contar con la siguiente estructura:

```.env
AWS_STORAGE_BUCKET_NAME=AWS_STORAGE_BUCKET_NAME
AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY
AWS_TEXTRACT_BUCKET=AWS_TEXTRACT_BUCKET
AWS_TEXTRACT_REGION=AWS_TEXTRACT_REGION
```

Estos secretos deben ser configurados apropiadamente en AWS para que el proyecto funcione correctamente. Estos hacen referencia los siguientes servicios de este:

- AWS Textract
- Dos buckets de AWS S3
- Una cuenta AMI con acceso a AWS Textract y a AWS S3

## Una mini guia de como un usuario utilizaría el software o la aplicación
1. El usuario ingresa al link de la página https://pi2transcriptia.dis.eafit.edu.co/ y lo primero que debe hacer es registrarse.

2. Al registrarse podrá acceder a la página principal, aquí encontrará todas las funcionalidades. Para comenzar, el usuario deberá subir una foto del documento desde el botón de Subir Imagen, después de unos segundos esta se verá reflejada en la tabla de Lista de Archivos.

3. Desde la tabla de Lista de Archivos el usuario podrá descargar la imagen que subió anteriormente, descargar la transcripción generada por la página, la cual es un archivo csv que se puede editar y volver a subir, además se pueden eliminar las filas de la tabla.

4. En la otra tabla Lista de Reportes, se pueden generar los reportes anuales correspondientes a las imagenes y descargarse.

## Resultados o pantallazos 
![image](https://user-images.githubusercontent.com/37346028/204393885-2cadc128-2ef4-4280-8f2b-f7d12c6e13a0.png)
![image](https://user-images.githubusercontent.com/37346028/204393859-ffb377ff-bf5d-4f35-bb47-c0ca12e21d1d.png)
![image](https://user-images.githubusercontent.com/37346028/204393773-3afa2752-9d9a-4e47-ac2d-480aaccc2d59.png)
![image](https://user-images.githubusercontent.com/37346028/204394006-919ad509-8979-416a-86ac-b7af2eff2372.png)
![image](https://user-images.githubusercontent.com/37346028/204394048-391fe84f-c225-4f43-b16d-c454f88dda95.png)
![image](https://user-images.githubusercontent.com/37346028/204393951-f6245567-0c89-4966-9c02-f290375c34d6.png)

# Referencias:
## https://docs.djangoproject.com/en/4.1/ref/files/uploads/
## https://docs.djangoproject.com/en/4.1/topics/http/file-uploads/
## https://stackoverflow.com/questions/7514964/django-how-to-create-a-file-and-save-it-to-a-models-filefield
## https://docs.djangoproject.com/en/4.1/topics/files/
## https://docs.djangoproject.com/en/4.1/ref/models/querysets/
## https://stackoverflow.com/questions/2997433/django-filtering-datetime-field-by-only-the-year-value
## https://www.youtube.com/watch?v=90sYmk4oAUc&list=PLlM3i4cwc8zBRQOGXuLrCLNfpVOuVLuwZ&index=3
## https://www.youtube.com/watch?v=_MbZSSXdM8s&list=PLlM3i4cwc8zBRQOGXuLrCLNfpVOuVLuwZ&index=6
## https://chakra-templates.dev/
## https://chakra-ui.com/docs/
## https://codesandbox.io/s/e0e6d?file=/src/index.tsx

#### versión README.md -> 1.0 (2022-noviembre)