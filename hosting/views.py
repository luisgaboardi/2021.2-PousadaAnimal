from datetime import datetime
from django.http import Http404
from hosting.serializers import HostingSerializer
from message.serializers import MessageSerializer
from payment.serializers import PaymentSerializer
from pets.models import Pet
from message.models import Message
from payment.models import Payment
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hosting.models import Hosting
from django.db.models import Q


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
        hosting = Hosting.objects.all()
        serializer = HostingSerializer(hosting, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
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
        hosting = self.get_object(pk)
        serializer = HostingSerializer(hosting)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        hosting = self.get_object(pk)
        serializer = HostingSerializer(hosting, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HostingMessages(APIView):
    queryset = Message.objects.all()
    """
    Get hostings messages by pk.
    """
    def get(self, request, pk, format=None):
        messages = self.queryset.filter(hosting=pk)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, pk, format=None):
        print(request.data)
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HostingPayment(APIView):
    queryset = Payment.objects.all()
    """
    Get payment by pk.
    """
    def get(self, request, pk, format=None):
        payment = self.queryset.filter(hosting=pk)
        serializer = PaymentSerializer(payment, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, pk, format=None):
        print(request.data)
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

