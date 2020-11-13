from django.contrib import admin
from django.urls import path, include
from . import settings
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

# pod auth/ je autentifikace uživatelů (dj_rest_auth urls). Pod /app jsou pak url mých views (endpointy) z aplikace
# Taskboard. account/ tu musí být kvůli dj_rest_auth, ale nic z těch urls já sám nepoužívám.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('accounts.urls')),
    path('account/', include('allauth.urls')),
    path('app/', include('taskboard.urls')),
    path(r'^', include('django.contrib.auth.urls')),
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
