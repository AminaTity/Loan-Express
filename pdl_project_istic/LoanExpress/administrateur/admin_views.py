from rest_framework.views import APIView
from rest_framework.response import Response
from .permissions import IsAdminUser
from .models import Admin
from django.contrib.auth import get_user_model
from loans.models import Loan
from invest.models import Invest
from loans.serializers import LoanSerializer
from invest.serializers import InvestSerializer
from .authentication import AdminJWTAuthentication


class AllUsersInvestmentsAndLoansAPIView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [AdminJWTAuthentication]
    
    def get(self, request):
        User = get_user_model()
         # Exclure les administrateurs (is_staff et is_superuser à False)
        users = User.objects.filter(is_staff=False, is_superuser=False)
        
        results = []
        for user in users:
            loans = Loan.objects.filter(student=user)
            investments = Invest.objects.filter(student=user)
            
            loan_data = LoanSerializer(loans, many=True).data
            investment_data = InvestSerializer(investments, many=True).data
            
            results.append({
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
                "loans": loan_data,
                "investments": investment_data
            })
        
        return Response(results, status=200)
