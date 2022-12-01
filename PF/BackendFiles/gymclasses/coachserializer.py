from django.contrib.auth.models import User
from rest_framework import serializers



class CoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'email'
        ]

    def to_representation(self, instance):
        from accounts.models import GetUserExtension, UserExtendedSerializer
        dat = super().to_representation(instance)
        uext = GetUserExtension(instance)
        dat2 = UserExtendedSerializer(uext).data
        dat["profile_pic"] = dat2["profile_pic"]

        return dat
