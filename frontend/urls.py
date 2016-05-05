"""frontend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url, include
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from members.views import RegisterView, login_member, ImportMemberView

admin.autodiscover()

urlpatterns = i18n_patterns(
    '',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^auth', include('django.contrib.auth.urls')),
    url(r'^cipedia/', include('members.urls')),
    url(r'^wiki/', include('ciwiki.urls')),
    url(r'^register/', RegisterView.as_view(), name="register"),
    url(r'^log_user/', login_member, name="test_log"),
    url(
        r'^retrieve_member/',
        login_required(ImportMemberView.as_view()),
        name="retrieve_member"),
)
