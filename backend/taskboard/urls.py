from django.urls import path
from .views import *


urlpatterns = [
    path('profile/detail/<int:pk>/', get_profile_detail),
    path('profile/', profile),
    path('board/', get_boards),
    path('board/update/<int:pk>/', update_board)
]