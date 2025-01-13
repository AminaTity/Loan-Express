from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Invest
from .serializers import InvestSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models
from administrateur.authentication import AdminJWTAuthentication
from django.db.models import Sum



# Vue API pour créer une demande de prêt
class InvestCreateAPIView(generics.CreateAPIView):
    queryset = Invest.objects.all()
    serializer_class = InvestSerializer
    permission_classes = [IsAuthenticated]  # Un utilisateur doit être connecté pour générer un investissement

    # Associer automatiquement l'étudiant et gérer la logique de création
    def perform_create(self, serializer):
        serializer.save(student=self.request.user)


# API pour lister les investissements du User connecté
class InvestListAPIView(generics.ListAPIView):
    serializer_class = InvestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Invest.objects.filter(student=self.request.user)


#Approuver les investissements
class ApproveInvestAPIView(APIView):
    authentication_classes = [AdminJWTAuthentication]
    permission_classes = [IsAdminUser]

    def post(self, request, invest_id):
        try:
            invest = Invest.objects.get(id=invest_id)
            invest.is_approved = True
            invest.save()
            return Response({
                "message": "Investissement approuvé avec succès.",
                "invest_id": invest_id,
                "is_approved": invest.is_approved
            }, status=status.HTTP_200_OK)
        except Invest.DoesNotExist:
            return Response({"error": "Investissement introuvable."}, status=status.HTTP_404_NOT_FOUND)
        
#API pour calculer les totaux
class TotalInvestmentsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_investments = Invest.objects.filter(is_approved=True).aggregate(total=Sum('amount'))['total'] or 0
        return Response({"total_investments": total_investments}, status=status.HTTP_200_OK)
