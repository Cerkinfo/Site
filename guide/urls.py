from django.conf.urls import *

from .views import CurrentGuideView, GuideView

urlpatterns = patterns(
    '',
    url(
        r'^$',
        CurrentGuideView.as_view(),
        name="current_guide"
    ),
    url(
        r'^(?P<slug>.+)',
        GuideView.as_view(),
        name='guide'),
)