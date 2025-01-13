from django.urls import path
from .views import LoanCreateAPIView, LoanListAPIView,ApproveLoanAPIView

urlpatterns = [
    path('createLoan/', LoanCreateAPIView.as_view(), name='create_loan_api'),
    path('loansList/', LoanListAPIView.as_view(), name='list_loans_api'),
]
