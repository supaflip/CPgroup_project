from django.contrib.auth.models import Group

client_group, created = Group.objects.get_or_create(name="Client")
client_group.permissions.all()

coach_group, created = Group.objects.get_or_create(name="Coach")
coach_group.permissions.all()
