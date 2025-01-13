from rest_framework import serializers
from .models import UserRole, Users
from .models import Document


class UtilisateurSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Champ pour le mot de passe

    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'password','profil','adresse', 'niveau', 'parcours','numero_identification','formation',
                  'poste']
        extra_kwargs = {'password': {'write_only': True}}  # Le mot de passe ne doit pas être lu
    def create(self, validated_data):
        # Utilise set_password pour hasher le mot de passe avant de créer l'utilisateur
        user = Users(
            username=validated_data['username'],
            email=validated_data['email'],
            profil=validated_data.get('profil', 'ETUDIANT'),
            niveau=validated_data.get('niveau', 'AUTRE'),
            parcours=validated_data.get('parcours','null'),
            formation=validated_data.get('formation','null'),
            poste=validated_data.get('poste', 'null'),
            numero_identification=validated_data['numero_identification'],
            adresse=validated_data.get('adresse','263 Avenue General Leclerc')
        )
        user.set_password(validated_data['password'])  # Hashe le mot de passe
        user.save()  # Sauvegarde l'utilisateur dans la base de données
        return user
    
# class gérer upload de fichiers
class UploadSerializer(serializers.ModelSerializer):
    class Meta:
        model=Document
        fields=['piece_identite','certificat_scolarite','contrat_bail','rib','revenus']
    def create(self, validated_data):
        # Récupère l'utilisateur de la requête
        user = self.context['request'].user
        # Crée un nouveau document en l'associant à l'utilisateur
        document = Document.objects.create(user=user,**validated_data)
        return document
        
#gerer les roles
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserRole
        fields=['role']
    def create(self, validated_data):
        user = self.context['request'].user  # Récupère l'utilisateur connecté
        role, created = UserRole.objects.get_or_create(
            user=user,
            role=validated_data['role']
        )
        if not created:
            #raise serializers.ValidationError("Cet utilisateur a déjà ce rôle.")
            return role
        return role