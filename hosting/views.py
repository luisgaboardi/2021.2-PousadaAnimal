from datetime import datetime
from django.http import Http404
from hosting.serializers import HostingSerializer
from pets.models import Pet
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hosting.models import Hosting

from djangoBackend.settings import DEBUG


class HostingList(APIView):
    """
    List all pets, or create a new pet.
    """

    def get_pet(self, pk):
        try:
            return Pet.objects.get(pk=pk)
        except Pet.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        if request.successful_authenticator or DEBUG:
            hosting = Hosting.objects.all()
            serializer = HostingSerializer(hosting, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, format=None):
        if request.successful_authenticator or DEBUG:
            owner_id = request.data['owner']
            pet_id = request.data['pet']
            pet = self.get_pet(pet_id)
            if pet == None or pet.get_owner().id != owner_id:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            
            serializer = HostingSerializer(data=request.data)
            
            # Fix data format to save in Django
            start_date = request.data['start_date']
            start_date = datetime.strptime(start_date, '%d%m%Y')
            request.data['start_date'] = start_date.strftime('%Y-%m-%d')
            end_date = request.data['end_date']
            end_date = datetime.strptime(end_date, '%d%m%Y')
            request.data['end_date'] = end_date.strftime('%Y-%m-%d')

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class HostingDetail(APIView):
    """
    Get one pet detail by pk.
    """

    def get_object(self, pk):
        try:
            return Hosting.objects.get(pk=pk)
        except Hosting.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        if request.successful_authenticator or DEBUG == True:
            hosting = self.get_object(pk)
            serializer = HostingSerializer(hosting)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def put(self, request, pk, format=None):
        if (request.successful_authenticator and request.user.is_staff) or DEBUG:
            hosting = self.get_object(pk)
            serializer = HostingSerializer(hosting, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_403_FORBIDDEN)
