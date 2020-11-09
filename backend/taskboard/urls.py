from django.urls import path
from .views import *


urlpatterns = [
    path('profile/detail/<int:pk>/', get_profile_detail),
    path('profile/', profile)
]