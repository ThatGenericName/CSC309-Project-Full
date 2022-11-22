import datetime as dt
from datetime import datetime, timedelta
from django.conf import settings
from django.utils.timezone import make_aware
import pytz
import rest_framework.parsers
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.core.validators import validate_email
from django.utils import timezone
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
import rest_framework.parsers

from PB.utility import ValidateInt, ValidatePhoneNumber
from accounts.models import UserExtension, User
from gymclasses.models import GymClass, GymClassSchedule
from studios.models import Studio

# Create your views here.


KEYS = [
    'name',
    'coach',
    'description',
    'keywords',
    'earliest_date',
    'last_date',
    'day',
    'start_time',
    'end_time',
    'enrollment_capacity'
]


class CreateGymClass(APIView):
    '''
    edits a specific profile
    '''

    parser_classes = [
        rest_framework.parsers.JSONParser,
        rest_framework.parsers.FormParser,
        rest_framework.parsers.MultiPartParser
    ]

    permission_classes = [IsAdminUser]

    def post(self, request: Request, *args, **kwargs):

        studioId = kwargs['studio_id']
        data = request.data

        errors = self.ValidateData(request.data)

        if len(errors):
            return Response(errors, status=400)

        try:
            studio = Studio.objects.get(id=studioId)
        except ObjectDoesNotExist:
            return Response({'error': 'Studio was not found'}, status=404)

        try:
            coach = User.objects.get(id=data["coach"])
        except ObjectDoesNotExist:
            return Response({'error': 'Coach was not found'}, status=404)

        if not coach.groups.filter(name='Coach').exists():
            return Response({'error': 'Coach was not found'}, status=404)

        start_time = dt.datetime.strptime(data['start_time'], '%H:%M').time()
        end_time = dt.datetime.strptime(data['end_time'], '%H:%M').time()

        start_date = datetime.strptime(data['earliest_date'], '%d/%m/%Y')
        start_date = datetime(year=start_date.year,
                              month=start_date.month,
                              day=start_date.day).date()

        end_date = datetime.strptime(data['last_date'], '%d/%m/%Y')
        end_date = datetime(year=end_date.year,
                            month=end_date.month,
                            day=end_date.day).date()

        any_classes = False

        for d in self.daterange(start_date, end_date):
            if d.strftime("%A") == data['day']:
                any_classes = True
                break

        if not any_classes:
            return Response({"No Classes given in start and end date"}, status=400)

        keywords = data.getlist('keywords')

        model_keywords = ""

        for item in keywords:
            model_keywords += item + ","
        model_keywords = model_keywords[:-1]

        gymclass = GymClass.objects.create(
            studio=studio,
            name=data['name'],
            description=data['description'],
            keywords=model_keywords,
            earliest_date=start_date,
            last_date=end_date,
            day=data['day'],
            start_time=start_time,
            end_time=end_time,
        )

        gymclass.save()

        for d in self.daterange(start_date, end_date):
            if d.strftime("%A") == data['day']:

                s = datetime(year=d.year, month=d.month, day=d.day,
                             hour=start_time.hour, minute=start_time.minute)
                tz = pytz.timezone("America/Toronto")
                s = tz.localize(s)

                e = datetime(year=d.year, month=d.month, day=d.day,
                             hour=end_time.hour, minute=end_time.minute)
                e = tz.localize(e)

                gymschedule = GymClassSchedule.objects.create(date=datetime(year=d.year,
                                                                            month=d.month,
                                                                            day=d.day).date(),
                                                              parent_class=gymclass,
                                                              coach=coach,
                                                              enrollment_capacity=data[
                                                                  "enrollment_capacity"],
                                                              start_time=s,
                                                              end_time=e)
                gymschedule.save()

        return Response({"success": True}, status=200)

    def ValidateData(self, data) -> dict:
        errors = {}
        for key in KEYS:
            if key not in data:
                errors[key] = "Missing Key"

        if 'day' not in errors:
            if data['day'] not in ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
                                   'Friday', 'Saturday', 'Sunday']:
                errors['day'] = "Wrong day name. Must be Monday, Tuesday, Wednesday," \
                                " Thursday, Friday, Saturday or Sunday"

        if 'enrollment_capacity' not in errors:
            try:
                int(data['enrollment_capacity'])
            except ValueError:
                errors['enrollment_capacity'] = "Wrong input format integer expected"

        if 'earliest_date' not in errors:
            try:
                datetime.strptime(data['earliest_date'], '%d/%m/%Y')
            except ValueError:
                errors['earliest_date'] = "Wrong Start Date Format"

        if 'earliest_date' not in errors:
            start = datetime.strptime(data['earliest_date'], '%d/%m/%Y')
            tz = pytz.timezone('America/Toronto')
            start = start.replace(tzinfo=tz)
            present = timezone.now()
            if start <= present:
                errors['earliest_date'] = "Earliest date must be later than the current date"

        if 'last_date' not in errors:
            try:
                datetime.strptime(data['last_date'], '%d/%m/%Y').date()
            except ValueError:
                errors['last_date'] = "Wrong End Date Format"

        if 'last_date' not in errors and 'earliest_date' not in errors:
            start = datetime.strptime(data['earliest_date'], '%d/%m/%Y')
            end = datetime.strptime(data['last_date'], '%d/%m/%Y')
            if start >= end:
                errors['last_date'] = "Last date must be later than the Start date"

        if 'start_time' not in errors:
            try:
                dt.datetime.strptime(data['start_time'], '%H:%M').time()
            except ValueError:
                errors['start_time'] = "Wrong Start Time Format"

        if 'end_time' not in errors:
            try:
                dt.datetime.strptime(data['end_time'], '%H:%M').time()
            except ValueError:
                errors['end_time'] = "Wrong End Time Format"

        if 'end_time' not in errors and 'start_time' not in errors:
            start_time = dt.datetime.strptime(data['start_time'], '%H:%M').time()
            end_time = dt.datetime.strptime(data['end_time'], '%H:%M').time()

            if start_time >= end_time:
                errors['end_time'] = "End Time must be later than the Start Time"

        return errors

    def daterange(self, date1, date2):
        for n in range(int((date2 - date1).days) + 1):
            yield date1 + timedelta(n)
