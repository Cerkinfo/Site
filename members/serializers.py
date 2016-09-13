from django.contrib.auth.models import User
from rest_framework import fields
from rest_framework import serializers

from members.models import Member, ComiteMembership, ComitePoste


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')


class ComitePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComitePoste
        fields = ('name', 'slug', 'email', 'is_bureau', 'is_bapteme')


class MembershipSerializer(serializers.ModelSerializer):
    postes = ComitePostSerializer(read_only=True, many=True)

    class Meta:
        model = ComiteMembership


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