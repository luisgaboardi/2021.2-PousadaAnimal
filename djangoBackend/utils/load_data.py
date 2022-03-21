from os import system

# Database
system('python3 manage.py makemigrations users')
system('python3 manage.py migrate')
system('python3 manage.py makemigrations pets')
system('python3 manage.py migrate')

# Create example users
print('Essa operação vai sobrescrever os dados salvos no banco de dados.')
print('Você deseja carregar os dados? (Y/n)')

user_input = input()

if user_input.lower() == 'y':
    system('python manage.py loaddata users pets')

# Super User
print('Create super user')
system('python3 manage.py createsuperuser')