from django.shortcuts import render
from coma.models import Transaction
from coma.serializers import TransactionSerializer
from rest_framework import generics
from rest_framework import permissions

class MakeTransaction(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )
