from coma.models import Transaction, Product
from coma.serializers import TransactionSerializer, ProductSerializer

from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework import permissions
from members.permissions import IsOwner

class TransactionView(mixins.CreateModelMixin,
        mixins.RetrieveModelMixin,
        mixins.ListModelMixin,
        viewsets.GenericViewSet):
    """
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = (
        permissions.IsAuthenticated,
        IsOwner,
    )

    def list(self, request):
        queryset = None
        if request.user.has_perm('coma.add_transaction'):
            queryset = Transaction.objects.all()
        else:
            queryset = queryset.filter(user=request.user.member)

        serializer = TransactionSerializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        if not serializer.is_valid():
            raise ValidationError()

        serializer.save(fromWho=self.request.user.member)


class ProductView(mixins.CreateModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        mixins.ListModelMixin,
        viewsets.GenericViewSet):
    """
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        if not self.request.user.has_perm('coma.add_product'):
            raise PermissionDenied("Il faut faire parti du bar pour ajouter des produits")

        if not serializer.is_valid():
            raise ValidationError()

        serializer.save()


    def destroy(self, request, *args, **kwargs):
        if not request.user.has_perm('coma.add_product'):
            raise PermissionDenied("Il faut faire parti du bar pour supprimer des produits")

        try:
            instance = self.get_object()
            self.perform_destroy(instance)
        except Http404:
            pass

        return Response()
