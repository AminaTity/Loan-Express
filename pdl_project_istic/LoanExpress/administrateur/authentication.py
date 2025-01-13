from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model
from .models import Admin

class AdminJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        user = super().get_user(validated_token)
        try:
            # Tenter de récupérer l'instance Admin correspondante
            return Admin.objects.get(email=user.email)
        except Admin.DoesNotExist:
            return user