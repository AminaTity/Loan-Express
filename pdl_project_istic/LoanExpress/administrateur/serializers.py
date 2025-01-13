from rest_framework import serializers
from .models import Admin
class AdminRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    username = serializers.CharField(required=True)

    class Meta:
        model = Admin
        fields = ['email', 'username', 'password']

    def create(self, validated_data):
        admin = Admin(
            username=validated_data['username'],
            email=validated_data['email'],
            is_staff=True,      # Définit is_staff à True
            is_superuser=True,  # Définit is_superuser à True
        )
        admin.set_password(validated_data['password'])  # Hache le mot de passe
        admin.save()
        return admin

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['password'] = "********"  # Pour des raisons de sécurité, on ne renvoie pas le vrai mot de passe
        return data

class AdminLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)