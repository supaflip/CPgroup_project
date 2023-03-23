from rest_framework import serializers
from .models import Week, Day, Workout, Profile, User

# Serializers define the API representation.

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = '__all__'

class DaySerializer(serializers.ModelSerializer):
    workouts = WorkoutSerializer(many=True, read_only=True)
    
    class Meta:
        model = Day
        fields = '__all__'

class WeekSerializer(serializers.ModelSerializer):
    days = DaySerializer(many=True, read_only=True)

    class Meta:
        model = Week
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user       

class ProfileSerializer(serializers.ModelSerializer):
    user_name = serializers.StringRelatedField(source='user', read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'

    def create_profile(self, validated_data):
        profile = Profile.objects.create_profile(**validated_data)
        return profile  