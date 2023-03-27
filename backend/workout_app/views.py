from .models import Week, Day, Workout, Profile
from .serializers import WeekSerializer, DaySerializer, WorkoutSerializer, ProfileSerializer, UserSerializer
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import authentication, status
from rest_framework.authentication import TokenAuthentication # permissions
from rest_framework.permissions import IsAuthenticated, AllowAny #IsAdminUser
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .permissions import HasGroupMembership
import logging
import requests
import random
import os


logger = logging.getLogger(__name__)

WORKOUT_API = 'https://api.api-ninjas.com/v1/exercises?muscle='

class WeekViewSet(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = (HasGroupMembership, )
    
    def get(self, request, week_number=None):
        if week_number: 
            data = Week.objects.get(week_number=week_number)
            serializer = WeekSerializer(data)
            return Response({"result": serializer.data})
        else:
            data = Week.objects.all()
            serializer = WeekSerializer(data, many=True)
        return Response({"result": serializer.data})
    
    def post(self, request):
        serializer = WeekSerializer(data=request.data)
        if serializer.is_valid():
            week = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def put(self, request, week_number=None):
        if week_number:
            week = Week.objects.get(week_number=week_number)
            serializer = WeekSerializer(week, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Week number not provided"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, week_number=None):
        if week_number:
            week = Week.objects.get(week_number=week_number)
            week.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Week number not provided"}, status=status.HTTP_400_BAD_REQUEST)
    
class DayViewSet(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = (HasGroupMembership, )

    def get(self, request, day_number=None):
        if day_number: 
            data = Day.objects.get(day_number=day_number)
            serializer = DaySerializer(data)
            return Response({"result": serializer.data})
        else:
            data = Day.objects.all()
            serializer = DaySerializer(data, many=True)
        return Response({"result": serializer.data})
    
    def post(self, request):
        serializer = DaySerializer(data=request.data)
        if serializer.is_valid():
            day = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, day_number=None):
        if day_number:
            day = Day.objects.get(day_number=day_number)
            serializer = DaySerializer(day, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Day number not provided"}, status=status.HTTP_400_BAD_REQUEST)
        

    def delete(self, request, day_number=None):
        if day_number:
            day = Day.objects.get(day_number=day_number)
            day.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Day number not provided"}, status=status.HTTP_400_BAD_REQUEST)
    
class WorkoutViewSet(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = (HasGroupMembership, )

    def get(self, request, id=None): # id or title?
        if id:
            data = Workout.objects.get(id=id)
            serializer = WorkoutSerializer(data)
            return Response({"result": serializer.data})
        else:
            data = Workout.objects.all()
            serializer = WorkoutSerializer(data, many=True)
        return Response({"result": serializer.data})
    
    def post(self, request):
        serializer = WorkoutSerializer(data=request.data)
        if serializer.is_valid():
            workout = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        if id:
            workout = Workout.objects.get(id=id)
            serializer = WorkoutSerializer(workout, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Workout ID not provided"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        if id:
            workout = Workout.objects.get(id=id)
            workout.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Workout ID not provided"}, status=status.HTTP_400_BAD_REQUEST)
    

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

        
    def get(self, request): # id?
        print("test")
        print(request.auth.key)
        user_id = Token.objects.get(key=request.auth.key).user_id
        print(user_id)
        try: 
            data = Profile.objects.get(user_id=user_id)
            serializer = ProfileSerializer(data)
            return Response(serializer.data)
        except Profile.DoesNotExist:
            return Response({"result": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        # else:
        #     data = Profile.objects.all()
        #     serializer = ProfileSerializer(data, many=True)
        #     return Response({"result": serializer.data})


    # def get(self, request): # id?  //this is your retrieve method for a one profile
    #     print(request.user.id, "this is user.id")
    #     user_id = request.user.id
    #     print(user_id, 'this is user_id')
    #     if user_id:
    #         try: 
    #             data = Profile.objects.get(user_id=user_id)
    #             serializer = ProfileSerializer(data)
    #         except:
    #             return Response({"result": "None Found"})
    #     else:
    #         data = Profile.objects.all()
    #         serializer = ProfileSerializer(data, many=True)
    #     return Response({"result": serializer.data})

    def put(self, request, id): # id?
        # user_id = request.user.id
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
    def get(self, request, id=None): # id?
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
        

class WorkoutHelper(APIView):
    #authentication_classes = [authentication.TokenAuthentication]
    #permission_classes = [IsAuthenticated]
    def post(self, request):
        print(request.data)
        muscle = request.data['muscle']
        response = requests.get(f'{WORKOUT_API}{muscle}', headers={'X-Api-Key': os.enviro('WORKOUT_API_KEY')})
        if response.status_code == requests.codes.ok:
            return Response(random.choice(response.json()))
        else:
            print("Error", response.status_code, response.text)


