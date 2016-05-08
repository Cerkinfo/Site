from django.conf.urls import patterns
from pv.models import PV

pv_dict = {
    'queryset': PV.objects.all().order_by('-meeting_date')
}

urlpatterns = patterns(
    '',
    (r'^$', 'django.views.generic.list.BaseListView')
)