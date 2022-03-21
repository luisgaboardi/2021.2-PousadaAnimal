from rest_framework import serializers
from .models import Pet


class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ['id', 'species', 'gender', 'breed', 'colour', 'size', 'age', 'weight', 'medical_conditions', 'temperament', 'is_hosted', 'since', 'owner']
