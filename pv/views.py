from django.views.generic import ListView
from pv.models import PV


class PVList(ListView):
    model = PV
    template_name = "pv_list.html"