from django.conf.urls import *
from django.contrib.auth.decorators import login_required

from .views import MemberDetailView, \
    YearDetailView, CurrentMemberDetailView, MemberEditView, YearEditView

urlpatterns = patterns(
    '',
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
        r'^year',
        YearDetailView.as_view(),
        name='year_detail'),
    url(
        r'^manage_year',
        login_required(YearEditView.as_view()),
        name='year_edit'),
)