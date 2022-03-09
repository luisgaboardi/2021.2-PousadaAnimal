from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    cpf = models.CharField(max_length=11)
    phone = models.CharField(max_length=12)
    cep = models.CharField(max_length=8)
    address = models.CharField(max_length=255)
    gender = models.CharField(max_length=1)
    date_of_birth = models.DateField()
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'cpf', 'phone', 'cep', 'address', 'gender', 'date_of_birth', 'password']

    objects = UserManager()

    def __str__(self):
        return self.email