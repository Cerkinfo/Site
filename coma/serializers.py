from rest_framework import serializers
from coma.models import Transaction, Product

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        read_only_fields = ('fromWho',)
        fields = ('user', 'fromWho', 'quantity', 'price', 'comment', 'date')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'price')
