from django.urls import path
from . import views 
urlpatterns = [
    path('inscription/', views.UtilisateurCreateView.as_view(), name='inscription-utilisateur'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('user_profile/', views.getUserProfileView.as_view(), name='user_profile'),
    # Vue pour se déconnecter
    #path('logout/', views.LogoutView.as_view(), name='logout'),
    path('upload/', views.VerifyDocument.as_view(), name='upload'),
    path('role/',views.Role.as_view(),name='role')
]
