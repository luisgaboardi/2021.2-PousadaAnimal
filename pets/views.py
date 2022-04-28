from django.http import Http404
from users.models import User
from pets.models import Pet
from pets.serializers import PetSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from djangoBackend.settings import DEBUG


class PetList(APIView):
    """
    List all pets, or create a new pet.
    """

    def get(self, request, format=None):
        pets = Pet.objects.all()
        serializer = PetSerializer(pets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = PetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class PetDetail(generics.RetrieveAPIView):
    """
    Get one pet detail by pk.
    """

    def get_object(self, pk):
        try:
            return Pet.objects.get(pk=pk)
        except Pet.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        pet = self.get_object(pk)
        serializer = PetSerializer(pet)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete (self, request, pk):
        pet = self.get_object(pk)
        pet.delete()
        return Response('/', status=status.HTTP_200_OK)
