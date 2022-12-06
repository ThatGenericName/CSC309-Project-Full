import datetime

import rest_framework.parsers
from django.utils import timezone
from pytz import tzinfo
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from accounts.Serializers.UserClassInterfaceSerialzier import \
    UserClassInterfaceSerializer
from accounts.models import GetUserExtension, UserClassInterface, UserExtension
from gymclasses.models import GymClassScheduleSerializer, GymClassSerializer


class AccountClassesPagination(PageNumberPagination):
    page_size = 10

class ViewEnrolledClasses(ListAPIView):

    parser_classes = [
        rest_framework.parsers.JSONParser,
        rest_framework.parsers.FormParser,
        rest_framework.parsers.MultiPartParser
    ]

    permission_classes = [IsAuthenticated]
    pagination_class = AccountClassesPagination
    serializer_class = UserClassInterfaceSerializer

    # def get(self, request, *args, **kwargs):
    #
    #     return super().get(request, *args, **kwargs)

    requestParams = None

    def ProcessRequestParams(self):

        p = []
        dat = self.request.query_params
        sort = 0
        if 'sort' in dat:
            if dat['sort'].lower() == 'des':
                sort = 1

        filt = 0
        if 'filter' in dat:
            if dat['filter'] == 'past':
                filt = 1
            elif dat['filter'] == 'future':
                filt = 2

        p.append(sort)
        p.append(filt)

        self.requestParams = p

    def get_queryset(self):
        self.ProcessRequestParams()
        user = self.request.user
        now = timezone.now()
        if self.requestParams[1] == 0:
            # all
            qs = UserClassInterface.objects.filter(user=user)
        elif self.requestParams[1] == 1:
            # past
            qs = UserClassInterface.objects.filter(user=user, class_session__start_time__lt=now)
        else:
            # future
            qs = UserClassInterface.objects.filter(user=user, class_session__start_time__gte=now)

        if self.requestParams[0] == 0:
            # ascending
            qs = qs.order_by('class_session__start_time')
        else:
            # descending
            qs = qs.order_by('-clas_session__start_time')
        end = timezone.now()
        return qs
