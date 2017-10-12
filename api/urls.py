from django.conf.urls import url, include
from rest_framework import routers
import members.api as member_views
import coma.api as coma_views


router = routers.DefaultRouter()
router.register(r'member', member_views.MemberViewSet)
router.register(r'transaction', coma_views.TransactionView)
router.register(r'product', coma_views.ProductView)
router.register(r'check_membership/(?P<card_id>.+)', member_views.MemberMembershipQuery)

urlpatterns = [
    url(r'^', include(router.urls)),
]
