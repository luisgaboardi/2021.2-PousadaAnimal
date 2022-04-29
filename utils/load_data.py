from os import system

# Database
system('python3 manage.py makemigrations users pets hosting message payment host services')
system('python3 manage.py migrate')

# Super User
print('Create super user')
system('python3 manage.py createsuperuser')