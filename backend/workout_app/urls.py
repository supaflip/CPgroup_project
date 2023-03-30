from django.urls import path
from . import views


urlpatterns = [
    path('', views.WeekViewSet.as_view()), # retrieves all weeks, backend link for creating new weeks
    path('week/<str:week_number>/', views.WeekViewSet.as_view()), # retrieves specific week and the days and workouts in it
    path('days/', views.DayViewSet.as_view()), # retrieves all days, backend link for creating new days
    path('day/<str:day_number>/', views.DayViewSet.as_view()), # retrieves specific day and the workouts in it
    path('workout/', views.WorkoutViewSet.as_view()), # retrieves all workouts, backend link for creating new workouts
    path('workout/<int:id>/', views.WorkoutViewSet.as_view()), # retrieves specific workout
    path('users/', views.UserSignupView.as_view()), # retrieves all users
    path('profiles/', views.ProfilesViewSet.as_view()), # retrieve all profiles
    path('profile/', views.ProfileViewSet.as_view()), # retrieve profile of user whose token is used in get request
    path('profile/<int:id>/', views.ProfileViewSet.as_view()),
    path('is_coach/profiles/', views.CoachOnlyProfilesViewSet.as_view()), # retrieve all profiles
    path('is_coach/profile/', views.CoachOnlyProfileViewSet.as_view()), # retrieve profile of user whose token is used in get request
    path('is_coach/profile/<int:id>/', views.CoachOnlyProfileViewSet.as_view()),
    path('helper/', views.WorkoutHelper.as_view())
]