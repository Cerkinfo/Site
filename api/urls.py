from django.conf.urls import url, include
from rest_framework import routers
import members.views as member_views


router = routers.DefaultRouter()
router.register(r'member', member_views.MemberViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]