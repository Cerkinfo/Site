from django.contrib import admin
from .models import Transaction, MolliePayment


@admin.register(MolliePayment)
class MolliePaymentAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'mollie_id', 'confirmed']


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['user', 'quantity', 'price', 'comment', 'date']
