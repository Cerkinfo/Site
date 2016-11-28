from django.conf.urls import url, include
from rest_framework import routers
import members.views as member_views


router = routers.DefaultRouter()
router.register(r'member', member_views.MemberViewSet)
# router.register(r'check_membership/(?P<card_id>.+)', member_views.MemberMembershipQuery)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'check_membership/(?P<card_id>.+)', member_views.MemberMembershipQuery.as_view(), name="check")
]
