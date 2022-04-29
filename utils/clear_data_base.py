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

#services
system('rm -r services/migrations')
system('rm -r services/__pycache__')

#host
system('rm -r host/migrations')
system('rm -r host/__pycache__')

#message
system('rm -r message/migrations')
system('rm -r message/__pycache__')

#message
system('rm -r payment/migrations')
system('rm -r payment/__pycache__')

#service
system('rm -r service/migrations')
system('rm -r service/__pycache__')

# app
system('rm -r djangoBackend/__pycache__')

