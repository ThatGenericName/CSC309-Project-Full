import rest_framework.parsers
from django.contrib.auth.models import Group, User
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAdminUser
from rest_framework.request import Request
from rest_framework.views import APIView

from accounts.models import AdminSimpleUserSerializer, IsCoach

class CoachesPagination(PageNumberPagination):
    page_size = 10

class GetAllUsers(ListAPIView):

    parser_classes = [
        rest_framework.parsers.JSONParser,
        rest_framework.parsers.FormParser,
        rest_framework.parsers.MultiPartParser
    ]

    permission_classes = [IsAdminUser | IsCoach]
    pagination_class = CoachesPagination
    serializer_class = AdminSimpleUserSerializer

    def get_queryset(self):

        users = User.objects.all().order_by('username')
        return users
