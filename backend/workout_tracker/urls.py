from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('workouts/', include(('workout_app.urls', 'app_name'), namespace='workouts')),
]
