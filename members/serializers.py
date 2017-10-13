from django.contrib.auth.models import User
from rest_framework import serializers

from members.models import Member, ComiteMembership, ComitePoste, AcademicYear


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')


class ComitePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComitePoste
        fields = ('name', 'slug', 'email', 'is_bureau', 'is_bapteme')

class AcademicYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicYear
        fields = ('start', 'stop',)

class MembershipSerializer(serializers.ModelSerializer):
    postes = ComitePostSerializer(read_only=True, many=True)
    year = AcademicYearSerializer(read_only=True)

    class Meta:
        model = ComiteMembership
        exclude = ('member',)


class MemberCardSerializer(serializers.BaseSerializer):
    id = serializers.IntegerField(required=True)
    member = serializers.IntegerField(required=True)
    year = serializers.IntegerField(required=True)
    paid = serializers.BooleanField(default=False)


class MemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    surnames = serializers.StringRelatedField(many=True)
    memberships = MembershipSerializer(source='comitemembership_set', read_only=True, many=True)

    class Meta:
        model = Member
        fields = (
            'id',
            'avatar',
            'wiki',
            'birthdate',
            'user',
            'surnames',
            'memberships'
        )


class MemberMembershipQuerySerializer(serializers.Serializer):
    """
    """
    status = serializers.BooleanField(required=True)
    error = serializers.CharField(required=False, max_length=100, allow_blank=True)
    member = MemberSerializer(required=False) # TODO Not well rendered
