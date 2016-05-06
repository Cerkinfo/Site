from django.conf.urls import *
from django.contrib.auth.decorators import login_required

from .views import HomeView
urlpatterns = patterns(
    '',
    url(
        r'^$',
        HomeView.as_view(),
        name="home"
    ),
)