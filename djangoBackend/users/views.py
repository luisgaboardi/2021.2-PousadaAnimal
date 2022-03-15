from django.http import Http404
from users.hash import hash_password
from users.models import User
from users.serializers import UserSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework import status
from rest_framework.authtoken.models import Token


class UserList(APIView):
    """
    List all users, or create a new user.
    """
    def get(self, request, format=None):
        permission_classes = [IsAuthenticated, IsAdminUser]
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        permission_classes = [AllowAny]
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            password = request.data['password']
            request.data['password'] = hash_password(password)
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                token = Token.objects.create(user=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
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
        permission_classes = [IsAuthenticatedOrReadOnly]
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)