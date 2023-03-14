from django.shortcuts import render
from .models import Week, Day, Workout, Profile
from .serializers import WeekSerializer, DaySerializer, WorkoutSerializer, ProfileSerializer, UserSerializer
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import authentication, status
from rest_framework.authentication import TokenAuthentication # permissions
from rest_framework.permissions import IsAuthenticated, AllowAny #IsAdminUser
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
import logging

logger = logging.getLogger(__name__)

class WeekViewSet(APIView):
    def get(self, request, week_number=None):
        if week_number: 
            data = Week.objects.get(week_number=week_number)
            serializer = WeekSerializer(data)
        else:
            data = Week.objects.all()
            serializer = WeekSerializer(data, many=True)
        return Response({"result": serializer.data})
    
class DayViewSet(APIView):
    def get(self, request, day_number=None):
        if day_number: 
            data = Day.objects.get(day_number=day_number)
            serializer = DaySerializer(data)
        else:
            data = Day.objects.all()
            serializer = DaySerializer(data, many=True)
        return Response({"result": serializer.data})
    
class WorkoutViewSet(APIView):
    def get(self, request, id=None):
        if id: 
            data = Workout.objects.get(id=id)
            serializer = DaySerializer(data)
        else:
            data = Workout.objects.all()
            serializer = WorkoutSerializer(data, many=True)
        return Response({"result": serializer.data})
    
class UserSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            profile_data = {'user': user.id}
            print(profile_data)
            profile_serializer = ProfileSerializer(data=profile_data)
            if profile_serializer.is_valid():
                print("Hello")
                profile_serializer.save()
            token = Token.objects.create(user=user)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request, id=None):
        if id: 
            data = User.objects.get(id=id)
            serializer = UserSerializer(data)
        else:
            data = User.objects.all()
            serializer = UserSerializer(data, many=True)
        return Response({"result": serializer.data})

class ProfileViewSet(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def __init__(self):
        print('ProfileViewSet initialized') 
    
        
    def post(self, request):
        logger.debug('post method called') # add this line to ensure the view is being called
        data = request.data
        data["user"] = request.user.id
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            profile = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            logger.debug(serializer.errors) # add this line to print any validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
    def get(self, request, id=None):
        if id is not None:
            try: 
                data = Profile.objects.get(id=id)
                serializer = ProfileSerializer(data)
                return Response(serializer.data)
            except Profile.DoesNotExist:
                return Response({"result": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            data = Profile.objects.all()
            serializer = ProfileSerializer(data, many=True)
            return Response({"result": serializer.data})

    def put(self, request, id):
        profile = Profile.objects.get(id=id)
        print(profile, 'this is the profile id in the put statement')
        request.data['user'] = profile.user.id
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        profile = Profile.objects.get(id=id)
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class ProfilesViewSet(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    def get(self, request, id=None):
        if id is not None:
            try: 
                data = Profile.objects.get(id=id)
                serializer = ProfileSerializer(data)
                return Response(serializer.data)
            except Profile.DoesNotExist:
                return Response({"result": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            data = Profile.objects.all()
            serializer = ProfileSerializer(data, many=True)
            return Response({"result": serializer.data})