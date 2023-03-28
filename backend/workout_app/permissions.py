from rest_framework import permissions

class HasGroupMembership(permissions.BasePermission):
    
    def has_permission(self, request, view):
        methods_list = ['POST', 'PUT', 'DELETE',]
        if request.method not in methods_list:
            return True
        
        group_name = "Coach"
        if request.user.groups.filter(name__exact=group_name).exists():
            print("test")
            return True
        
        return False
