from django.conf.urls import *

from .views import CurrentGuideView

urlpatterns = patterns(
    '',
    url(
        r'^$',
        CurrentGuideView.as_view(),
        name="current_guide"
    ),
)