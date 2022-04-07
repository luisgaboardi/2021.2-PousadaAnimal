from datetime import datetime
from django.http import Http404
from pets.models import Pet
from pets.serializers import PetSerializer
from djangoBackend.settings import DEBUG
from users.models import User
from users.serializers import UserSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken import views
from rest_framework.authtoken.models import Token


class UserLogin(views.ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=email)
        user = User.objects.all().filter(email=email)[0]
        return Response({
            'user': {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'cpf': user.cpf,
                'phone': user.phone,
                'cep': user.cep,
                'address': user.address,
                'gender': user.gender,
                'date_of_birth': user.date_of_birth,
                'is_active': user.is_active,
                'staff': user.staff,
                'admin': user.admin
            },
            'token': token.key
        })

class UserList(APIView):
    """
    List all users, or create a new user.
    """
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        date_of_birth = request.data['date_of_birth']
        date_of_birth = datetime.strptime(date_of_birth, '%d%m%Y')
        request.data['date_of_birth'] = date_of_birth.strftime('%Y-%m-%d')
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetail(generics.RetrieveAPIView):
    """
    Get one user detail by pk.
    """
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserPets(generics.RetrieveAPIView):
    queryset = Pet.objects.all()
    """
    Get user pets detail by pk.
    """
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        pets = self.queryset.filter(owner=pk)
        serializer = PetSerializer(pets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)