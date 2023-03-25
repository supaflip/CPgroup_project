from rest_framework import permissions

class HasGroupMembership(permissions.BasePermission):
    
    def has_permission(self, request, view):
        methods_list = ['GET', ]
        if request.method not in methods_list:
            return False
        
        group_name = "Coach"
        if request.user.groups.filter(name__exact=group_name).exists():
            print("test")
            return True
        
        return False
