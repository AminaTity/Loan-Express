
# Create your models here.

from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.contrib.auth import authenticate, login,get_user_model
class Users(AbstractUser):
    pass
    # Champs supplémentaires si nécessaire
    # ROLE_CHOICES = (
    #     ('ETUDIANT', 'Étudiant'),
    #     ('INVESTISSEUR', 'Investisseur'),
    # )
    # role = models.CharField(max_length=15, choices=ROLE_CHOICES,default='ETUDIANT')
    # Autres champs spécifiques à ton projet
    numero_identification = models.CharField(max_length=15, unique=True, null=True,blank=True)
    adresse = models.CharField(max_length=255, default='263 Avenue General Leclerc')
    PROFIL_CHOICES = (
         ('ETUDIANT', 'Étudiant'),
        ('PERSONNEL', 'Personnel'),
    )
    profil = models.CharField(max_length=25, choices=PROFIL_CHOICES,default='ETUDIANT')

    formation = models.CharField(max_length=255, default='AUTRE')
    
    NIVEAU_CHOICES=(
        ('Licence 1','licence 1'),
        ('Licence 2', 'licence 2'),
        ('Licence 3', 'licence 3'),
        ('Master 1','master 1'),
        ('Master 2','master 2'),
        ('AUTRE','AUTRE')

    )
    niveau= models.CharField(max_length=15, choices=NIVEAU_CHOICES,default='null')
    PARCOURS_CHOICES = (
        ('CLASSIQUE', 'Classique'),
        ('ALTERNANCE', 'Alternance'),
    )
    parcours = models.CharField(max_length=25, choices=PARCOURS_CHOICES, default='null')
    poste=models.CharField(max_length=255, default='null')
    # Spécifie des related_name distincts pour éviter les conflits
    groups = models.ManyToManyField(Group, related_name='utilisateur_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='utilisateur_permissions_set', blank=True)
   
    def __str__(self):
        return f"{self.username} ({self.role})"
    
    #class pour uploader les fichiers
class Document(models.Model):
    user=models.ForeignKey(Users,on_delete=models.CASCADE)
    piece_identite=models.FileField(upload_to='media/')
    certificat_scolarite=models.FileField(upload_to='media/')
    contrat_bail=models.FileField(upload_to='media/')
    rib=models.FileField(upload_to='media/')
    revenus=models.FileField(upload_to='media/')
    uploaded_at=models.DateTimeField(auto_now_add=True)
   
    
#class role user
class UserRole(models.Model):
    user=models.ForeignKey(Users,on_delete=models.CASCADE)
    ROLE_CHOICES = (
         ('EMPRUNTEUR', 'Emprunteur'),
         ('INVESTISSEUR', 'Investisseur'),
         ('AUTRE', 'AUTRE'),
     )
    role = models.CharField(max_length=15, choices=ROLE_CHOICES,blank=False, default="AUTRE")
    class Meta:
        unique_together = ('user', 'role')