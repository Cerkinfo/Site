from django.conf.urls import url
from django.contrib.auth.decorators import login_required

import members.views as views

urlpatterns = [
    url(
        r'^$',
        views.YearListView.as_view(),
        name="cipedia_home"
    ),
    url(
        r'^profile',
        login_required(views.CurrentMemberDetailView.as_view()),
        name='profile'),
    url(
        r'^member/(?P<slug>.+)',
        views.MemberDetailView.as_view(),
        name='member_profil'),
    url(
        r'^edit',
        login_required(views.MemberEditView.as_view()),
        name='user_edit'),
    url(
        r'^year/(?P<slug>.+)',
        views.YearDetailView.as_view(),
        name='year_detail'),
    url(
        r'^manage_year/(?P<slug>.+)',
        login_required(views.YearEditView.as_view()),
        name='year_edit'),
]
