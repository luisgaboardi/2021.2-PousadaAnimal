from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'cpf',
                  'phone', 'cep', 'address', 'gender', 'date_of_birth', 'password']
