from django.db import models
from members.models import Member


class Transaction(models.Model):
    user = models.ForeignKey(Member)
    # from = models.ForeignKey(Member)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    comment = models.CharField(null=True, default="", max_length=255)
    date = models.DateTimeField(auto_now_add=True)


class MolliePayment(models.Model):
    confirmed = models.BooleanField(default=False)
    amount = models.DecimalField(max_digits=5, decimal_places=2)
    transaction = models.ForeignKey(Transaction, null=True)
    mollie_id = models.CharField(max_length=255, null=True)
    user = models.ForeignKey(Member)
