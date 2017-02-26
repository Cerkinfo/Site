from django.db import models
from django.db.models import signals
from django.core.exceptions import PermissionDenied
from coma.errors import InsufficientBalance
from django.dispatch import receiver
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

    class Meta:
        permissions = (
            ("create_purchase", u"Permission to create purchase for anyone."),
            ("add_money", u"Permission to add money to account."),
        )

    def __str__(self):
        return "Transaction with %s, %.2f€, %i items on %s" % (self.user, self.price, self.quantity, self.date)


@receiver(signals.pre_save, sender=Transaction)
def transaction_execute(instance, *args, **kwargs):
    """
    @desc: Change la balance de l'utilisateur lors d'une transaction et vérifie
        aussi que celui qui a fait la transaction en a bien la permission.

    @args{instance}: The actual instance being saved.
    """
    if (instance.price >= 0) and (not instance.fromWho.user.has_perm('coma.create_purchase')):
        # If (instance.price >= 0) the transaction is made to buy something.
        # Checking if the user who made the transaction can make purchases.
        raise PermissionDenied("Il faut avoir la permission d'acheter pour passer une transaction.")
    elif (instance.price < 0) and (not instance.fromWho.user.has_perm('coma.add_money')):
        raise PermissionDenied("Vous n'avez pas la permission d'ajouter de l'argent")
    else:
        new_balance = instance.user.balance - instance.price
        if new_balance >= 0:
            instance.user.balance = new_balance
            instance.user.save()
        else:
            raise InsufficientBalance()

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
