from django.urls import path
from . import views


urlpatterns = [
    path('', views.WeekViewSet.as_view()),
    path('users/', views.UserSignupView.as_view()), # retrieves all users
    path('profiles/', views.ProfilesViewSet.as_view()), # retrieve all profiles
    path('profile/', views.ProfileViewSet.as_view()),
    path('profile/<int:id>/', views.ProfileViewSet.as_view()),
    path('helper/', views.WorkoutHelper.as_view())
]