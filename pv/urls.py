from django.conf.urls import patterns, url
from pv.feeds import LatestPVFeed
from pv.models import PV
from pv.views import PVList

pv_dict = {
    'queryset': PV.objects.all().order_by('-meeting_date')
}



urlpatterns = patterns(
    '',
    url(r'^$', PVList.as_view(), name='pv'),
    url(r'^rss/$', LatestPVFeed())
)