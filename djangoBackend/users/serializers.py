from dataclasses import fields
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'gender', 'cpf', 'phone', 'cep', 'address', 'date_of_birth', 'staff', 'password']
