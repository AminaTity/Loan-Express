from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Loan
from .serializers import LoanSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models
from django.db.models import Sum

from administrateur.authentication import AdminJWTAuthentication
# Vue API pour créer une demande de prêt
class LoanCreateAPIView(generics.CreateAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    permission_classes = [IsAuthenticated]  # Un utilisateur doit être connecté pour créer un prêt

    # Associer automatiquement l'étudiant et gérer la logique de création
    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

# API pour lister les prêts de l'étudiant connecté
class LoanListAPIView(generics.ListAPIView):
    serializer_class = LoanSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Loan.objects.filter(student=self.request.user)
#approuver les emprunts
class ApproveLoanAPIView(APIView):
    authentication_classes = [AdminJWTAuthentication]
    permission_classes = [IsAdminUser]

    def post(self, request, loan_id):
        print(f"User type: {type(request.user)}")
        print(f"Is admin? {getattr(request.user, 'is_admin', False)}")
        try:
            loan = Loan.objects.get(id=loan_id)
            loan.is_approved = True
            loan.save()
            return Response({
                "message": "Emprunt approuvé avec succès.",
                "loan_id": loan_id,
                "is_approved": loan.is_approved
            }, status=status.HTTP_200_OK)
        except Loan.DoesNotExist:
            return Response({"error": "Emprunt introuvable."}, status=status.HTTP_404_NOT_FOUND)

#API POUR CALCULER LES TOTAUX
class TotalLoansAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_loans = Loan.objects.filter(is_approved=True).aggregate(total=Sum('amount'))['total'] or 0
        return Response({"total_loans": total_loans}, status=status.HTTP_200_OK)