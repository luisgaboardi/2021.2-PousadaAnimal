from os import system

# Database
system('rm db.sqlite3')

#users
system('rm -r users/migrations')
system('rm -r users/__pycache__')

# app
system('rm -r djangoBackend/__pycache__')
