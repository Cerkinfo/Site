from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners to see it
    """
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user.member

class IsBar(permissions.BasePermission):
    """
    Custom permission to allow barman only
    """
    def has_object_permission(self, request, view, obj):
        return True

class IsOwnerOrBar(permissions.BasePermission):
    """
    Custom permission to allow barman and owner only
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            # Check permissions for read-only request
            return obj.user == request.user.id
        else:
            # Check permissions for write request
            return obj.user == request.user.id
