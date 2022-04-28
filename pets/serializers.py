from rest_framework import serializers
from .models import Pet


class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ['id', 'name', 'host', 'gender', 'breed', 'colour', 'age', 'weight', 'medical_conditions', 'temperament', 'is_hosted', 'owner']
