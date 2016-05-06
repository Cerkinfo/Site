from agenda.icalReader import IcalReader
from agenda.models import Event
from django.views.generic import TemplateView
from guide.models import Guide


class HomeView(TemplateView):
    template_name = "home.html"

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        guide = Guide.objects.filter(active=True).get()
        events = Event.objects.filter(displayed=True).all()
        context['guide'] = guide
        context['events'] = events
        context['height'] = '300'
        context['length'] = len(events)
        context['slideSize'] = str(
            100 / (
                len(events) if len(events) > 0 else 1
            )
        ).replace(',','.')
        context['animLength'] = 7
        context['items'] = [(i, events[i]) for i in range(len(events))]
        context['instance'] = IcalReader(
            "https://calendar.google.com/calendar/ical/" +
            "b6s2tn7vm5mr8cl4sdq1m9qp0o%40group.calendar.google.com/" +
            "public/basic.ics"
        ).read()
        return context