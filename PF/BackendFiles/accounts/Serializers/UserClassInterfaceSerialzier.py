from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import serializers

from accounts.models import AdminSimpleUserSerializer, UserClassInterface
from gymclasses.models import GymClassScheduleSerializer


class UCIUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_staff'
        ]

    def to_representation(self, instance):
        dat = super().to_representation(instance)
        dat['is_coach'] = instance.groups.filter(name='Coach').exists()
        return dat


class UserClassInterfaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserClassInterface

        fields = [
            'financial_hold',
            'dropped'
        ]

    def to_representation(self, instance):

        dat = super().to_representation(instance)
        classData = GymClassScheduleSerializer(instance.class_session).data
        userData = UCIUserSerializer(instance.user).data

        dat['class_session'] = classData
        dat['user'] = userData

        return dat

class UserClassInterfaceSerializerNoUser(serializers.ModelSerializer):
    class Meta:
        model = UserClassInterface

        fields = [
            'financial_hold',
            'dropped'
        ]

    def to_representation(self, instance):
        dat = super().to_representation(instance)
        classData = GymClassScheduleSerializer(instance.class_session).data
        dat['class_session'] = classData

        return dat
