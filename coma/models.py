from django.db import models
from django.contrib.auth.models import User


class Transaction(models.Model):
    user = models.ForeignKey(User)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    comment = models.CharField(null=True, default="", max_length=255)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Transaction with %s, %.2f€, %i items on %s" % (self.user, self.price, self.quantity, self.date)


class MolliePayment(models.Model):
    confirmed = models.BooleanField(default=False)
    amount = models.DecimalField(max_digits=5, decimal_places=2)
    transaction = models.ForeignKey(Transaction, null=True)
    mollie_id = models.CharField(max_length=255, null=True)
    user = models.ForeignKey(User)

    def __str__(self):
        return "Payment from %s (%.2f€, %s)" % (self.user, self.amount, "confirmed" if self.confirmed else "unconfirmed")
