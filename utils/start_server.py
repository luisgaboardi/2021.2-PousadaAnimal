from os import system

# Database
system('python3 manage.py makemigrations users pets hosting services message payment')

system('python3 manage.py migrate')

# Server
system('python3 manage.py runserver localhost:8000')