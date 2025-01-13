from django.urls import path

from invest.views import ApproveInvestAPIView, TotalInvestmentsAPIView
from loans.views import ApproveLoanAPIView,TotalLoansAPIView
from .views import AdminRegistrationView, AdminLoginView
from .admin_views import AllUsersInvestmentsAndLoansAPIView

urlpatterns = [
    path('register/', AdminRegistrationView.as_view(), name='admin-register'),
    path('loginAdmin/', AdminLoginView.as_view(), name='admin-login'),
    path('admin/user/investments-loans/', AllUsersInvestmentsAndLoansAPIView.as_view(), name='user-investments-loans'),
    path('approve-loan/<int:loan_id>/', ApproveLoanAPIView.as_view(), name='approve-loan'),
    path('approve-invest/<int:invest_id>/', ApproveInvestAPIView.as_view(), name='approve-invest'),
    path('total-loans/', TotalLoansAPIView.as_view(), name='total-loans'),
    path('total-investments/', TotalInvestmentsAPIView.as_view(), name='total-investments'),

]