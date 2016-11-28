from django.db import models
from django.contrib.auth.models import User


class Transaction(models.Model):
    user = models.ForeignKey(User)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    comment = models.CharField(null=True, default="", max_length=255)
    date = models.DateTimeField(auto_now_add=True)
