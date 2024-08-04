from django.urls import path, include
from .views import index
#Previous URL patterns

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path("", include("QalendarApp.urls")),
# ]


urlpatterns = [
    path('', index),
]