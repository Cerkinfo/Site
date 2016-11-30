from django.conf.urls import url, patterns
from .views import start_payment, finish_payment

urlpatterns = patterns(
    '',
    url(
        r'^top_up$',
        start_payment,
        name="coma_top_up"
    ),
    url(
        r'^top_up_end/(?P<id>\d+)$',
        finish_payment,
        name="coma_top_up_end"
    ),
)
