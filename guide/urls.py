from django.conf.urls import url

from .views import GuideView

urlpatterns = [
    url(
        r'^$',
        GuideView.as_view(),
        name="current_guide"
    ),
]
