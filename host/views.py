from django.http import Http404
from .models import Host
from .serializers import HostSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from djangoBackend.settings import DEBUG


class HostList(APIView):
    """
    List all host, or create a new host.
    """

    def get(self, request, format=None):
        hosts = Host.objects.all()
        serializer = HostSerializer(hosts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = HostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class HostDetail(generics.RetrieveAPIView):
    """
    Get one host detail by pk.
    """

    def get_object(self, pk):
        try:
            return Host.objects.get(pk=pk)
        except Host.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        host = self.get_object(pk)
        serializer = HostSerializer(host)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete (self, request, pk):
        host = self.get_object(pk)
        host.delete()
        return Response('/', status=status.HTTP_200_OK)