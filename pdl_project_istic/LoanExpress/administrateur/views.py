from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import AdminRegistrationSerializer, AdminLoginSerializer
from .models import Admin
class AdminRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AdminRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            admin = serializer.save()
            return Response({
                'email': admin.email,
                'username': admin.username,
                'password': "********"  # Pour des raisons de sécurité
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)
            
            if user and isinstance(user, Admin):
                return Response({
                    'email': user.email,
                    'username': user.username,
                    'password': "********"
                }, status=status.HTTP_200_OK)
            return Response({
                'error': 'Email ou mot de passe incorrect ou utilisateur non admin'
            }, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)