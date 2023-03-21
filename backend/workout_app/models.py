from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Week(models.Model):
    week_number = models.CharField(max_length=2, unique=True, error_messages={'unique':"This week number already exists"}) # 1, 2,10 --testing out CharField instead of IntegerField

    class Meta:
        verbose_name = "week"
        verbose_name_plural = "weeks"

    def __str__(self):
        return f'Week {self.week_number}'

class Day(models.Model):
    week = models.ForeignKey(Week, on_delete=models.CASCADE, related_name='days') #week_number in class Week
    day_number = models.CharField(max_length=4) # 3.1, 3.2, 10.6 --only 10 weeks, only 7 days each week, testing out CharField

    class Meta:
        verbose_name = "day"
        verbose_name_plural = "days"

    def __str__(self):
        return f'Day {self.day_number}'

class Workout(models.Model):
    week = models.ForeignKey(Week, on_delete=models.CASCADE, related_name='workouts')  
    day = models.ForeignKey(Day, on_delete=models.CASCADE, related_name='workouts')
    title = models.CharField(max_length=50) # Back Squat, High Pulls, Pull to Hip w/ Pause+Clean+Jerk
    note = models.CharField(max_length=255, null=True, blank=True) # brief note or just general directive instead of numbers (e.g., 'to a heavy 2RM for the day')
    sets = models.CharField(max_length=2, null=True, blank=True) # 5, 12
    reps = models.CharField(max_length=10, null=True, blank=True) # 4, 3+2, 1+1+3
    percentage = models.IntegerField(null=True, blank=True) # 65, 80, 105

    class Meta:
        verbose_name = "workout"
        verbose_name_plural = "workouts"

    def __str__(self):
        return self.title
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    WEIGHTS_CHOICES = [ (1, "LB"), (2, "KG")]
    weights = models.IntegerField(choices=WEIGHTS_CHOICES, default=1, null=False, blank=False) # metric and english, or pounds and kilos
    max_snatch = models.IntegerField(null=True)
    max_cleanjerk = models.IntegerField(null=True)
    max_frontsquat = models.IntegerField(null=True)
    max_backsquat = models.IntegerField(null=True)
    

    def __str__(self):
        return self.user.username
