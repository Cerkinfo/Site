from django import forms


class PaymentForm(forms.Form):
    amount = forms.IntegerField()
