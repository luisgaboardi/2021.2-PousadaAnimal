from os import system

# Database
system('python3 manage.py makemigrations users')
system('python3 manage.py migrate')

# Server
system('python3 manage.py runserver 0.0.0.0:8000')