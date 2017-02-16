from django import forms
from django.core.exceptions import ValidationError
from django.conf import settings

from coma.models import Transaction, Product

def validate_top_up(value):
    if value < 0:
        raise ValidationError("La valeur d'une recharge ne peut être négative")

    minimal = getattr(settings, "MINIMAL_TOP_UP_AMOUNT", 5)
    if value < minimal:
        raise ValidationError("Vous devez rechargez de %i€ minimum." % minimal)


class PaymentForm(forms.Form):
    amount = forms.FloatField(validators=[validate_top_up])

class ProductForm(forms.ModelForm):
    class Meta:
        model = Transaction
        fields = (
            'user',
            'price',
        )

class PurchaseForm(forms.ModelForm):
    class Meta:
        model = Transaction
        fields = (
            'user',
            'quantity',
            'price',
            'comment',
        )

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = (
            'name',
            'price',
        )
