from django.views.generic import TemplateView
from guide.models import Guide


class HomeView(TemplateView):
    template_name = "home.html"

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        guide = Guide.objects.filter(active=True).get()
        context['guide'] = guide
        return context