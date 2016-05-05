from django.conf.urls import patterns, url
from wiki.urls import get_pattern as get_wiki_pattern
from django_nyt.urls import get_pattern as get_nyt_pattern


urlpatterns = patterns('',
    url(r'^notifications/', get_nyt_pattern()),
    url(r'^', get_wiki_pattern())
)