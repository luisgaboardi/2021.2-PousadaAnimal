from datetime import datetime
from django.http import Http404
from djangoBackend.settings import DEBUG
from users.models import User
from users.serializers import UserSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class UserList(APIView):
    """
    List all users, or create a new user.
    """
    def get(self, request, format=None):
        if request.successful_authenticator or DEBUG:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        date_of_birth = request.data['date_of_birth']
        date_of_birth = datetime.strptime(date_of_birth, '%d%m%Y')
        request.data['date_of_birth'] = date_of_birth.strftime('%Y-%m-%d')
        print(request.data['date_of_birth'])
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
        if request.successful_authenticator or DEBUG:
            user = self.get_object(pk)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)