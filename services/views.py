from django.http import Http404
from services.models import Service
from services.serializers import ServiceSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from djangoBackend.settings import DEBUG


class ServiceList(APIView):
    """
    List all services, or create a new Service.
    """

    def get(self, request, format=None):
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class ServiceDetail(generics.RetrieveAPIView):
    """
    Get one service detail by pk.
    """

    def get_object(self, pk):
        try:
            return Service.objects.get(pk=pk)
        except Service.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        service = self.get_object(pk)
        serializer = ServiceSerializer(service)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete (self, request, pk):
        service = self.get_object(pk)
        service.delete()
        return Response(status=status.HTTP_200_OK)