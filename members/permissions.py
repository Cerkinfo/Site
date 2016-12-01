from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners to see it
    """
    def has_permission(self, permission, request, view):
        return True

    def has_object_permission(self, permission, request, view, obj):
        return obj.user == request.user.member

class IsBar(permissions.BasePermission):
    """
    """
    def has_permission(self, permission, request, view):
        return True

    def has_object_permission(self, permission, request, view, obj):
        return obj.user == request.user.member.is_bar
