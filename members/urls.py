from django.conf.urls import url
from django.contrib.auth.decorators import login_required

from members.views import *

urlpatterns = [
    url(
        r'^$',
        YearListView.as_view(),
        name="cipedia_home"
    ),
    url(
        r'^profile',
        login_required(CurrentMemberDetailView.as_view()),
        name='profile'),
    url(
        r'^member/(?P<slug>.+)',
        MemberDetailView.as_view(),
        name='member_profil'),
    url(
        r'^edit',
        login_required(MemberEditView.as_view()),
        name='user_edit'),
    url(
        r'^year/(?P<slug>.+)',
        YearDetailView.as_view(),
        name='year_detail'),
    url(
        r'^manage_year/(?P<slug>.+)',
        login_required(YearEditView.as_view()),
        name='year_edit'),
]
