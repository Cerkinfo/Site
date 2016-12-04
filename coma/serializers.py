from rest_framework import serializers
from coma.models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        read_only_fields = ('fromWho',)
        fields = ('user', 'fromWho', 'quantity', 'price', 'comment', 'date')
