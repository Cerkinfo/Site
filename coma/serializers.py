from rest_framework import serializers
from coma.models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('user', 'quantity', 'price', 'comment', 'date')
