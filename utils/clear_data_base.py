from os import system

# Database
system('rm db.sqlite3')

#users
system('rm -r users/migrations')
system('rm -r users/__pycache__')

#pets
system('rm -r pets/migrations')
system('rm -r pets/__pycache__')

#hosting
system('rm -r hosting/migrations')
system('rm -r hosting/__pycache__')

#message
system('rm -r message/migrations')
system('rm -r message/__pycache__')

# app
system('rm -r djangoBackend/__pycache__')
