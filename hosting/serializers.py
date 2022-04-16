from rest_framework import serializers
from .models import Hosting


class HostingSerializer(serializers.ModelSerializer):
    messages = serializers.StringRelatedField(many=True)

    class Meta:
        model = Hosting
        fields = '__all__'
