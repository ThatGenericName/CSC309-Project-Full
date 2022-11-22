import datetime
from itertools import chain
import pytz
from django.utils import timezone
import rest_framework.parsers
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
import rest_framework.parsers
from datetime import datetime
from pytz import timezone

from PB.utility import ValidateInt, ValidatePhoneNumber
from accounts.models import UserExtension, User
from gymclasses.models import *
from studios.models import Studio


class ClassesofStudioPagination(PageNumberPagination):
    page_size = 10


class ClassesofStudio(ListAPIView):
    '''
    edits a specific profile
    '''

    parser_classes = [
        rest_framework.parsers.JSONParser,
        rest_framework.parsers.FormParser,
        rest_framework.parsers.MultiPartParser
    ]

    permission_classes = [IsAuthenticated]
    pagination_class = ClassesofStudioPagination
    model = GymClassSchedule
    serializer_class = GymClassScheduleSerializer

    def get(self, request, *args, **kwargs):
        studio_id = kwargs['studio_id']
        try:
            studio = Studio.objects.get(id=studio_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Studio Class was not found'}, status=404)

        if not len(GymClassSchedule.objects.filter(parent_class__studio=studio)):
            return Response({'No Classes  found'}, status=404)

        return super().get(request, *args, **kwargs)

    def get_queryset(self):

        studio_id = self.kwargs['studio_id']

        studio = Studio.objects.get(id=studio_id)

        classes = GymClassSchedule.objects.filter(parent_class__studio=studio)

        qs = classes.filter(start_time__gt=timezone.now())
        qs = qs.filter(end_time__gt=timezone.now())
        qs = qs.filter(is_cancelled=False)

        return qs
