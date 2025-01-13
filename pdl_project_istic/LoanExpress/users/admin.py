
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    # Les autres configurations pour l'admin ici
    pass
