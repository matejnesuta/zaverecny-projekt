from django.urls import path
from .views import *


urlpatterns = [
    path('profile/detail/<int:pk>/', get_profile_detail),
    path('profile/', profile),
    path('board/', get_boards),
    path('board/<int:pk>/', board),
    path('board/create/', create_board),
    path('board/detail/<int:pk>/', get_board_detail),
    path('log/<int:pk>/', get_log),
    path('task/create/', create_task),
    path('task/<int:pk>/', task)
]