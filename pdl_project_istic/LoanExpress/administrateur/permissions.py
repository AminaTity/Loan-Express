from rest_framework import permissions
from .models import Admin

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        # Vérifiez d'abord l'authentification
        if not request.user or not request.user.is_authenticated:
            return False
            
        # Vérifiez si c'est un Admin et si is_admin est True
        return isinstance(request.user, Admin) and getattr(request.user, 'is_admin', False)