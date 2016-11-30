from django.shortcuts import render, get_object_or_404
from django.conf import settings
from django.http import HttpResponseRedirect
from django.db.models import F
from django.http import HttpResponseForbidden
from django.contrib.auth.decorators import login_required

import Mollie

from coma.models import MolliePayment, Transaction
from coma.forms import PaymentForm
from coma.serializers import TransactionSerializer
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from members.permissions import IsOwner, IsOwnerOrBar
from members.models import Member

class TransactionView(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    # authentication_classes = BasicAuthentication
    permission_classes = (
        permissions.IsAuthenticated,
        IsOwner,
    )

    def perform_create(self, serializer):
        serializer.save(user=self.request.member)


def get_api():
    mollie = Mollie.API.Client()
    mollie.setApiKey(settings.MOLLIE_API_KEY)
    return mollie


@login_required
def start_payment(request):
    if request.method == 'POST':
        form = PaymentForm(request.POST)
        if form.is_valid():
            mollie = get_api()

            amount = form.cleaned_data['amount']

            payment = MolliePayment.objects.create(
                amount=amount,
                user=request.user
            )

            api_payment = mollie.payments.create({
                'amount': amount,
                'description': 'Recharge pour %s' % request.user,
                'redirectUrl': 'http://localhost:8000/coma/top_up_end/%i' % payment.id
            })

            payment.mollie_id = api_payment['id']
            payment.save()

            return HttpResponseRedirect(api_payment['links']['paymentUrl'])

    else:
        form = PaymentForm()

    return render(request, 'top_up.html', {'form': form})


@login_required
def finish_payment(request, id):
    payment = get_object_or_404(MolliePayment, pk=id)

    if payment.confirmed:
        return HttpResponseForbidden("This payment already has been confirmed")
    if payment.user != request.user:
        return HttpResponseForbidden("You may not get the payment of somebody else !")

    api_payment = get_api().payments.get(payment.mollie_id)

    if api_payment.isPaid():
        transaction = Transaction.objects.create(
            user=request.user,
            quantity=0,
            price=payment.amount,
            comment="Mollie transaction"
        )

        payment.confirmed = True
        payment.transaction = transaction
        payment.save()

        member = Member.objects.get(user=request.user)
        member.balance = F('balance') + payment.amount
        member.save()

        return render(request, 'top_up_success.html', {'amount': payment.amount})
    else:
        return render(request, 'top_up_success.html', {'amount': -1})
