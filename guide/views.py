from django.views.generic import TemplateView, DetailView
from guide.models import Guide


class CurrentGuideView(TemplateView):
    template_name = "guide.html"

    def get_context_data(self, **kwargs):
        context = super(CurrentGuideView, self).get_context_data(**kwargs)
        guide = Guide.objects.filter(active=True).get()
        context['guide'] = guide
        return context

class GuideView(DetailView):
    model = Guide
    template_name = "guide.html"
    context_object_name = 'guide'
    slug_field = 'slug'