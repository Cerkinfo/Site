from django.views.generic import TemplateView


class CurrentGuideView(TemplateView):
    template_name = "guide.html"