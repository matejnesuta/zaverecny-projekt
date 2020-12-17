from django.urls import path
from .views import *

urlpatterns = [
    path('profile/detail/<int:pk>/', get_profile_detail),
    path('profile/', profile),
    path('board/', get_boards),
    path('board/<int:pk>/', board),
    path('board/create/', create_board),
    path('board/detail/<int:pk>/', get_board_detail),
    path('board/user/delete/', remove_user),
    path('log/<int:pk>/', get_log),
    path('task/create/', create_task),
    path('task/<int:pk>/', task),
    path('task/attachment/', add_attachment),
    path('task/attachment/<int:pk>/', attachment),
    path('task/comments/<int:pk>/', comments),
    path('task/comments/delete/<int:pk>/', delete_comment),
    path('task/users/<int:pk>/', get_users),
    path('users/search/', search_for_users),
    path('users/invite/<int:id>/', invite),
]
