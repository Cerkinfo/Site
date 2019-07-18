from agenda.icalReader import IcalReader
from django.core.exceptions import ObjectDoesNotExist
from django.views.generic import TemplateView
from members.models import AcademicYear
import json

CALS_URL = [
        "https://calendar.google.com/calendar/ical/b6s2tn7vm5mr8cl4sdq1m9qp0o%40group.calendar.google.com/public/basic.ics",
]

class HomeView(TemplateView):
    template_name = "main.html"

    def get_context_data(self, **kwargs):

        context = super(HomeView, self).get_context_data(**kwargs)
        try:
            year_active = AcademicYear.objects.filter(active=True).get()
        except ObjectDoesNotExist:
            year_active = None
        try:
            context['events_dict'] = json.dumps(IcalReader(CALS_URL).get())
        except:
            context['events_dict'] = "[]"

        context['academic_year'] = year_active

        return context
