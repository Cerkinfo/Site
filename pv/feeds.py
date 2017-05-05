from django.contrib.syndication.views import Feed
from pv.models import PV


class LatestPVFeed(Feed):
    title = "Dernier PVs"
    link = "/pv/"
    description = "Dernier procès-verbaux du Cercle Informatique"

    def items(self):
        return PV.objects.all().order_by('-upload_date')[:10]

    def item_link(self, item):
        return item.ressource.url

