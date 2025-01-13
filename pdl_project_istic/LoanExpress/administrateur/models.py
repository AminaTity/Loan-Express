
from django.db import models
from users.models import Users
from django.contrib.auth import get_user_model

class Admin(Users):
   
    is_admin = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = 'Admin'
        verbose_name_plural = 'Admins'
        
    def __str__(self):
        return self.email
    @classmethod
    def get_by_natural_key(self, email):
            return self.get(email=email)