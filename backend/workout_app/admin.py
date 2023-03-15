from django.contrib import admin
from .models import Week, Day, Workout, Profile

# Register your models here.
admin.site.register(Week)
admin.site.register(Day)
admin.site.register(Workout)
admin.site.register(Profile)