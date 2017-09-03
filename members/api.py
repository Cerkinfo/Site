from rest_framework import mixins
from rest_framework import filters
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from members.models import Member, ComiteMembership, AcademicYear
from members.serializers import MemberSerializer, MemberCardSerializer, MemberMembershipQuerySerializer

class MemberViewSet(mixins.RetrieveModelMixin,
        mixins.ListModelMixin,
        viewsets.GenericViewSet):
    """
    @desc: API to visualize cerkinfo's members.
    """
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    filter_backends = (
        filters.SearchFilter,
        filters.OrderingFilter
    )
    search_fields = ('user__username', 'user__first_name', 'user__last_name')

    @detail_route(methods=['get', 'post'])
    def self(self, request, pk=None):
        serializer = MemberSerializer(data=request.user)
        return serializer.data


class FullMemberViewSet(mixins.RetrieveModelMixin,
        mixins.ListModelMixin,
        viewsets.GenericViewSet):
    """
    @desc: API to visualize cerkinfo's members with full details.
    """
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    filter_backends = (
        filters.SearchFilter,
        filters.OrderingFilter
    )
    search_fields = ('user__username', 'user__first_name', 'user__last_name')

    @detail_route(methods=['post'])
    def register_member_card(self, request, pk=None):
        serializer = MemberCardSerializer(data=request.data)
        if serializer.is_valid():
            ms = ComiteMembership.objects.get_or_create(
                member_id=serializer.data['member'],
                year__slug=serializer.data['year']
            )[0]
            ms.card_id = serializer.data['id']
            ms.paid = serializer.data['paid']
            ms.save()
            return Response({'status': 'card id registered'})
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )


class MemberMembershipQuery(mixins.RetrieveModelMixin,
        mixins.ListModelMixin,
        viewsets.GenericViewSet):
    """
    @desc: API endpoint to verify if a card_id is one of a member.

    @args{card_id}: A {card_id} argument is passed in the url to verify if the
        {card_id} is one of a member.
    """
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    def get_queryset(self):
        cid = self.kwargs.get('card_id', None)
        return Member.objects.filter(card_id=cid)
