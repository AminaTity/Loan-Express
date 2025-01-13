from django.urls import path
from .views import InvestCreateAPIView, InvestListAPIView

urlpatterns = [
    path('createInvest/', InvestCreateAPIView.as_view(), name='create_loan_api'),
    path('investList/', InvestListAPIView.as_view(), name='create_loan_api'),
]
