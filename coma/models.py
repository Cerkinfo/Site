from django.db import models
from django.db.models import signals
from members.models import Member


class Transaction(models.Model):
    """
    @desc: Model used to store a transaction.

    @field{user}: User who made a purchase. This field is set by the one who
        made the transaction, with the buyer barcode or username.
    @field{fromWho}: User who made the transaction possible. This section is
        set automatically one the transaction is made.
    @field{quantity}: Number of thing bought at the {price}.
    @field{price}: Price of a unit bought in the transaction.
    @field{comment}: Optionnal field but usually used to name the purchase (eg: beer, water).
    """

    user = models.ForeignKey(Member, on_delete=models.CASCADE, related_name="transaction_user")
    fromWho = models.ForeignKey(Member, on_delete=models.CASCADE, null=True, related_name="transaction_from")
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    comment = models.CharField(null=True, default="", max_length=255)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Transaction with %s, %.2f€, %i items on %s" % (self.user, self.price, self.quantity, self.date)


def transaction_execute(sender, instance, created, *args, **kwargs):
    """
    @args{sender}: The model class, here {Transaction}.
    @args{instance}: The actual instance being saved.
    @args{created}: A boolean set to "True" if a new record has been created.
    """

    if created:
        instance.user.balance -= instance.price
        if instance.user.balance >= 0:
            instance.user.save()
        else:
            # Return error
            pass
signals.post_save.connect(transaction_execute, sender=Transaction)


class Product(models.Model):
    """
    @desc: Table to store "Product" for transaction purpose.
        This table can be changed when particular event happen to match
        the products sold at the time.

    @field{name}: Name used to describe the purchase (e.g: Beer).
    @field{price}: Unit price of the purchase.
    """

    name = models.CharField(max_length=64)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return "%s: %i" % (self.name, self.price)


class MolliePayment(models.Model):
    """
    @desc: Table used for Mollie Transaction
    """
    user = models.ForeignKey(Member)
    transaction = models.ForeignKey(Transaction, null=True)
    confirmed = models.BooleanField(default=False)
    amount = models.DecimalField(max_digits=5, decimal_places=2)
    mollie_id = models.CharField(max_length=255, null=True)

    def __str__(self):
        return "Payment from %s (%.2f€, %s)" % (self.user, self.amount, "confirmed" if self.confirmed else "unconfirmed")
