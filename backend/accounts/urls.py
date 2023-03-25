from django.urls import path
# from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path('signin/', views.SigninView.as_view()), # obtain_auth_token),
    path('coach_signup/', views.CoachSignupView.as_view()),
    path('signup/', views.SignupView.as_view()),
    path('signout/', views.SignoutView.as_view()),
]