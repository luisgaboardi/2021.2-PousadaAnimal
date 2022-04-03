from rest_framework import serializers
from .models import User


class UserPetsSerializer(serializers.ModelSerializer):
    pets = serializers.StringRelatedField(many=True)

    class Meta:
        model = User
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'gender',
                  'cpf', 'phone', 'cep', 'address', 'date_of_birth', 'password']

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            gender=validated_data['gender'],
            cpf=validated_data['cpf'],
            phone=validated_data['phone'],
            cep=validated_data['cep'],
            address=validated_data['address'],
            date_of_birth=validated_data['date_of_birth'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
