from django.db import models
from django.db.models import signals
from members.models import Member


class Transaction(models.Model):
    user = models.ForeignKey(Member, on_delete=models.CASCADE)
    # fromWho = models.ForeignKey(Member, on_delete=models.CASCADE, null=True)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    comment = models.CharField(null=True, default="", max_length=255)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Transaction with %s, %.2f€, %i items on %s" % (self.user, self.price, self.quantity, self.date)


def transaction_execute(sender, instance, created, *args, **kwargs):
    """
    Argument explanation:

    sender - The model class. (Transaction)
    instance - The actual instance being saved.
    created - Boolean; True if a new record was created.
    """
    if created:
        instance.user.balance += instance.price
        if instance.user.balance >= 0:
            instance.user.save()
        else:
            # Return error
            pass
signals.post_save.connect(transaction_execute, sender=Transaction)


class MolliePayment(models.Model):
    user = models.ForeignKey(Member)
    transaction = models.ForeignKey(Transaction, null=True)
    confirmed = models.BooleanField(default=False)
    amount = models.DecimalField(max_digits=5, decimal_places=2)
    mollie_id = models.CharField(max_length=255, null=True)

    def __str__(self):
        return "Payment from %s (%.2f€, %s)" % (self.user, self.amount, "confirmed" if self.confirmed else "unconfirmed")
