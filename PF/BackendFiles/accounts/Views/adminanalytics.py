from django.contrib.auth.models import Group, User
from rest_framework.permissions import IsAdminUser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView


class UserAnalytics(APIView):


    permission_classes = [IsAdminUser]


    def get(self, request: Request):

        totalCount = User.objects.all().count()
        adminCount = User.objects.filter(is_staff=True).count()
        coachGroup, created = Group.objects.get_or_create(name='Coach')
        coachCount = coachGroup.user_set.all().count()
        normal = User.objects.exclude(is_staff=True).exclude(groups__name__contains='Coach')
        normalCount = normal.count()

        data = {
            'total_count': totalCount,
            'admin_count': adminCount,
            'coach_count': coachCount,
            'normal_count': normalCount
        }

        return Response(data, status=200)


