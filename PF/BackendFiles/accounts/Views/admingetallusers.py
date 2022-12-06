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

    permission_classes = [IsAdminUser]
    pagination_class = CoachesPagination
    serializer_class = AdminSimpleUserSerializer

    def get_queryset(self):
        users = User.objects.all().order_by('username').distinct()
        return users

    def filter_queryset(self, queryset):
        if ('filter' in self.request.query_params):
            key = self.request.query_params['filter']
            f1 = queryset.filter(username__contains=key)
            f2 = queryset.filter(first_name__contains=key)
            f3 = queryset.filter(last_name__contains=key)
            f4 = queryset.filter(email__contains=key)

            f5 = f1 | f2 | f3 | f4

            return f5

        return super().filter_queryset(queryset)
