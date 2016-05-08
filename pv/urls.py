from django.conf.urls import patterns
from pv.feeds import LatestPVFeed
from pv.models import PV
from pv.views import PVList

pv_dict = {
    'queryset': PV.objects.all().order_by('-meeting_date')
}



urlpatterns = patterns(
    '',
    (r'^$', PVList.as_view()),
    (r'^rss/$', LatestPVFeed())
)