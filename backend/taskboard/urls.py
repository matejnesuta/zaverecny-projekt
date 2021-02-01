from django.urls import path, include
from .views import *
from .search import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
books = router.register(r'profile',
                        ProfileDocumentView,
                        basename='profiledocument')

urlpatterns = [
    path('profile/detail/<int:pk>/', get_profile_detail),
    path('profile/', profile),
    path("board/current/<int:pk>/", current_board),
    path('board/', get_boards),
    path('board/<int:pk>/', board),
    path('board/create/', create_board),
    path('board/detail/<int:pk>/', get_board_detail),
    path('board/manage-user/', role),
    path('board/users/<int:pk>/', get_users),
    path('log/<int:pk>/', get_log),
    path('task/create/', create_task),
    path('task/<int:pk>/', task),
    path('task/attachment/', add_attachment),
    path('task/attachment/<int:pk>/', attachment),
    path('task/comments/<int:pk>/', comments),
    path('task/comments/delete/<int:pk>/', delete_comment),
    path('users/search/', include(router.urls)),
    path('users/invite/', invite),
]
