# TRANSCRIPT IA
> Transcript IA es un software para el consultorio Julian Leon Ramirez Zuluaga, el cual transforma tablas en papel en archivos de Excel a traves de IA.
> Para probarlo entrar [_aqui_](pi2transcriptia.dis.eafit.edu.co). 

## Tabla de contenidos
- [TRANSCRIPT IA](#transcript-ia)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Informacion general](#informacion-general)
  - [Tecnologias usadas](#tecnologias-usadas)
  - [Funcionalidades](#funcionalidades)
  - [Diagramas](#diagramas)
    - [Diagrama de despliegue y tecnologia](#diagrama-de-despliegue-y-tecnologia)
    - [Diagrama de procesos de IA](#diagrama-de-procesos-de-ia)
  - [Iniciar a correrlo](#iniciar-a-correrlo)


## Informacion general
- El software busca reducir el tiempo de transcripcion del registro de basuras bi-semanal que tiene que hacer el consultorio, el cual toma aproximadamente 2 horas a mano.
- Con la solucion propuesta, la persona encargada debera solo escanear las tablas y el software se encargara de transformarlas en archivos de Excel.


## Tecnologias usadas
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

(Estos son los principales, hay mas enunciados en el archivo requirements.txt)


## Funcionalidades
Las funcionalidades que ofrece el software son:
- Privacidad y seguridad de los datos a traves de inicio de sesion.
- Conversion de tablas en papel a archivos de Excel.
- Software de correccion de errores de transcripcion.
- Visualizacion de las imagenes, conversiones y tablas de excel en una misma pagina.
- Capacidad de descargar lo mencionado anteriormente.


<!-- ## Screenshots>
<!-- [Example screenshot](./img/screenshot.png) >
<!-- If you have screenshots you'd like to share, include them here. -->

## Diagramas

### Diagrama de despliegue y tecnologia
![image](https://user-images.githubusercontent.com/58788781/197372027-1069c108-2b37-45d0-82f0-7450c853d183.png)

[link a lucidchart](https://lucid.app/lucidchart/a26e6175-a1c9-4822-9ebf-0c16f3885f39/edit?viewport_loc=-1565%2C-1253%2C5622%2C2608%2C0_0&invitationId=inv_8d8c8282-7adb-4965-a41c-c551c363a794)

### Diagrama de procesos de IA
![image](https://user-images.githubusercontent.com/58788781/197372053-c69389f5-741b-4035-b7b0-b3e666dac60e.png)

[link a lucidchart](https://lucid.app/lucidchart/ffe3c99c-82b5-4653-a479-7e2405734a7b/edit?viewport_loc=-610%2C1331%2C3328%2C1578%2C0_0&invitationId=inv_96e2ac02-6b3b-4943-9916-dcf8c2d55b0b)

## Iniciar a correrlo
Como requisitos se debe tener instalado:
- Docker
- Docker Compose
- Git

Loos pasos para correr el software son:
1. Se debe clonar el repositorio actual en la branch Main
2. Abrir una terminal en la carpeta del repositorio descargado
3. Correr el comando `docker-compose up --build`
4. Esperar a que se construya el contenedor
5. Abrir un navegador y entrar a la direccion `localhost:3000`
