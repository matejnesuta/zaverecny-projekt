from django.urls import path, include, re_path
from django.views.generic import TemplateView
from .views import RegisterView, null_view, empty_view
from dj_rest_auth.registration.views import VerifyEmailView
from dj_rest_auth.views import PasswordResetConfirmView

urlpatterns = [
    path('password/reset/confirm/', empty_view, name='password_reset_confirm'),
    path('registration/account-confirm-email/', null_view, name='account_confirm_email'),
    path('registration/', RegisterView.as_view(), name='rest_register'),
    path('registration/verify-email/', VerifyEmailView.as_view(), name='rest_verify_email'),
    path('', include('dj_rest_auth.urls')),
]