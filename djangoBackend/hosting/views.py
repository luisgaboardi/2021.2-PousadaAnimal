from django.http import Http404
from hosting.serializers import HostingSerializer
from users.models import User
from pets.models import Pet
from pets.serializers import PetSerializer
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

    def get(self, request, format=None):
        if request.successful_authenticator or DEBUG:
            hosting = Hosting.objects.all()
            serializer = HostingSerializer(hosting, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, format=None):
        if request.successful_authenticator or DEBUG:
            if request.user.id == request.data['owner']:
                serializer = HostingSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class HostingDetail(generics.RetrieveAPIView):
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
