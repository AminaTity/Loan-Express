import logging
from urllib import request
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from .serializers import RoleSerializer, UploadSerializer, UtilisateurSerializer
from .models import Document, UserRole, Users
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
import json


# View of User Create
@method_decorator(csrf_exempt, name='dispatch')
class UtilisateurCreateView(generics.CreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UtilisateurSerializer
    permission_classes = [AllowAny]

    """ def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Récupérer l'utilisateur nouvellement créé
        user = serializer.instance
        
        # Préparer la réponse avec les informations utilisateur
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            # Ajouter d'autres champs si nécessaire
        }
        
        headers = self.get_success_headers(serializer.data)
        return Response({
            'message': 'User created successfully',
            'user': user_data
        }, status=status.HTTP_201_CREATED, headers=headers)
 """
# Authentification user
User = get_user_model()

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = [AllowAny]
    # Requête POST pour la connexion User
    def post(self, request):
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                login(request, user)
                # Générer un token JWT
                refresh = RefreshToken.for_user(user)
                return Response({
                    'message': 'Login successful', 
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
    
@method_decorator(csrf_exempt, name='dispatch')
class getUserProfileView(APIView):
    permission_classes = [AllowAny]    
    
    def post(self, request):
        data = request.data
        email = data.get('email')
        password = data.get('password')

        # Authentifier l'utilisateur
        user = authenticate(request, username=email, password=password)

        if user is not None:
            # L'utilisateur est authentifié avec succès

            # Générer un token JWT
            refresh = RefreshToken.for_user(user)

            return Response({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "profil": getattr(user, "profil", None),  # Ajouter d'autres champs si nécessaire
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }
            }, status=status.HTTP_200_OK)
        else:
            # Les informations fournies sont incorrectes
            return Response({"error": "Email ou mot de passe invalide"}, status=status.HTTP_401_UNAUTHORIZED)

#upload de fichiers  
@method_decorator(csrf_exempt, name='dispatch')
class VerifyDocument(APIView):
    serializer_class=UploadSerializer
    parser_classes=[MultiPartParser, FormParser]
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()  # Enregistre l'objet en incluant l'utilisateur
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       
#recuperer le role du user
@method_decorator(csrf_exempt, name='dispatch')
class Role(APIView):
    permission_classes = [AllowAny]
    queryset=UserRole.objects.all()
    serializer_class=RoleSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

