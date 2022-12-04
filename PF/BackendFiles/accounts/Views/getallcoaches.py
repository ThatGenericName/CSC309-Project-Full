import rest_framework.parsers
from django.contrib.auth.models import Group
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAdminUser
from rest_framework.request import Request
from rest_framework.views import APIView

from accounts.models import AdminCoachSerializer, IsCoach

class CoachesPagination(PageNumberPagination):
    page_size = 10

class GetAllCoaches(ListAPIView):

    parser_classes = [
        rest_framework.parsers.JSONParser,
        rest_framework.parsers.FormParser,
        rest_framework.parsers.MultiPartParser
    ]

    permission_classes = [IsAdminUser | IsCoach]
    pagination_class = CoachesPagination
    serializer_class = AdminCoachSerializer

    def get_queryset(self):
        group, created = Group.objects.get_or_create(name='Coach')
        users = group.user_set.all().order_by('username')
        return users
