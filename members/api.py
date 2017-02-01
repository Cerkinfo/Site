from rest_framework import views
from rest_framework import mixins
from rest_framework import filters
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from members.models import Member, ComiteMembership, AcademicYear
from members.serializers import MemberSerializer, FullMemberSerializer, MemberCardSerializer, MemberMembershipQuerySerializer

class MemberViewSet(mixins.RetrieveModelMixin,
        mixins.ListModelMixin,
        viewsets.GenericViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class FullMemberViewSet(mixins.RetrieveModelMixin,
        mixins.ListModelMixin,
        viewsets.GenericViewSet):
    queryset = Member.objects.all()
    serializer_class = FullMemberSerializer
    filter_backends = (
        filters.SearchFilter,
        filters.OrderingFilter
    )
    search_fields = ('user__email', 'comitemembership__card_id')

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

# TODO Change to search
class MemberMembershipQuery(views.APIView):
    def get(self, request, card_id):
        serializer = None
        try:
            user = Member.objects.get(card_id=card_id)
        except ObjectDoesNotExist as e:
            serializer = MemberMembershipQuerySerializer(
                data=dict(
                    status=False,
                    error="Not a user",
                )
            )
        except ValueError as e:
            serializer = MemberMembershipQuerySerializer(
                data=dict(
                    status=False,
                    error=e,
                )
            )
        else:
            current_year = AcademicYear.objects.get(active=True)

            try:
                membership = ComiteMembership.objects.get(member=user, year=current_year)
                serializer = MemberMembershipQuerySerializer(
                    data=dict(
                        status=membership.paid,
                        member=FullMemberSerializer(user).data,
                    )
                )
            except ObjectDoesNotExist:
                serializer = MemberMembershipQuerySerializer(
                    data=dict(
                        status=False,
                        member=FullMemberSerializer(user).data,
                    )
                )

        serializer.is_valid()
        return Response(serializer.data)
