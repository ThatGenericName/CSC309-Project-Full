from rest_framework import serializers

from accounts.models import AdminSimpleUserSerializer, UserClassInterface
from gymclasses.models import GymClassScheduleSerializer


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
        userData = AdminSimpleUserSerializer(instance.user).data
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
