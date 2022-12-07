import os

import pytz
from geopy.geocoders import Nominatim
import datetime

import rest_framework.parsers
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAdminUser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone

from ..models import *

from PB.utility import ValidatePhoneNumber, ValidatePostalCode, ValidatePicture

from studios.models import Studio


class EditGymClass(APIView):
    parser_classes = [
        rest_framework.parsers.JSONParser,
        rest_framework.parsers.FormParser,
        rest_framework.parsers.MultiPartParser
    ]

    # permission_classes = [IsAdminUser]

    keys = [
        'studio',
        'name',
        'description',
        'keywords',
        'earliest_date',
        'last_date',
        'day',
        'start_time',
        'end_time'
    ]

    def post(self, request: Request, *args, **kwargs):

        data = request.data
        gym_class_id = kwargs["gymclass_id"]

        errors = self.ValidateData(request.data)

        if len(errors):
            return Response(errors, status=400)

        if not GymClass.objects.filter(id=gym_class_id):
            return Response({'error':"Wrong GymClass Id"}, status=404)

        if data["studio"] and not Studio.objects.filter(id=data["studio"]):
            errors["studio"] = "Wrong Studio Id"
            return Response(errors, status=404)

        gym_class = GymClass.objects.get(id=gym_class_id)

        earliest_date, last_date = gym_class.earliest_date, gym_class.last_date
        start_time, end_time = gym_class.start_time, gym_class.end_time
        day = gym_class.day

        if data["earliest_date"]:
            earliest_date = datetime.datetime.strptime(data['earliest_date'], '%d/%m/%Y')
            earliest_date = datetime.datetime(year=earliest_date.year,
                                              month=earliest_date.month,
                                              day=earliest_date.day).date()
        if data["last_date"]:
            last_date = datetime.datetime.strptime(data['last_date'], '%d/%m/%Y')
            last_date = datetime.datetime(year=last_date.year,
                                          month=last_date.month,
                                          day=last_date.day).date()
        if data["start_time"]:
            start_time = datetime.datetime.strptime(data['start_time'], '%H:%M')
            tz = pytz.timezone("America/Toronto")
            start_time = start_time.replace(year=2022)
            start_time = tz.localize(start_time)
        if data["end_time"]:
            end_time = datetime.datetime.strptime(data['end_time'], '%H:%M')
            tz = pytz.timezone("America/Toronto")
            end_time = end_time.replace(year=2022)
            end_time = tz.localize(end_time)

        if data["day"]:
            day = data["day"]

        if earliest_date >= last_date:
            errors["earliest_date"] = "Start Date must be later than the End Date"
            errors["last_date"] = "Start Date must be later than the End Date"
            return Response(errors, status=400)
        if start_time >= end_time:
            errors["start_time"] = "Start Time must be later than the End Time"
            errors["end_time"] = "Start Time must be later than the End Time"
            return Response(errors, status=400)


        if data["studio"]:
            setattr(gym_class, "studio", Studio.objects.get(id=data["studio"]))
        if data["name"]:
            setattr(gym_class, "name", data["name"])
        if data["description"]:
            setattr(gym_class, "description", data["description"])
        if data["keywords"]:
            keywords = data.getlist('keywords')

            model_keywords = ""

            for item in keywords:
                model_keywords += item + ","
            model_keywords = model_keywords[:-1]
            setattr(gym_class, "keywords", model_keywords)

        setattr(gym_class, "earliest_date", earliest_date)
        setattr(gym_class, "last_date", last_date)
        setattr(gym_class, "day", day)
        setattr(gym_class, "start_time", start_time)
        setattr(gym_class, "end_time", end_time)

        gym_class.save()

        GymClassSchedule.objects.filter(parent_class_id=gym_class,
                                        start_time__gt=timezone.now()).delete()

        for d in self.daterange(earliest_date, last_date):
            if d.strftime("%A") == day:
                s = datetime.datetime(year=d.year, month=d.month, day=d.day,
                                      hour=start_time.hour, minute=start_time.minute)
                tz = pytz.timezone("America/Toronto")
                s = tz.localize(s)

                e = datetime.datetime(year=d.year, month=d.month, day=d.day,
                                      hour=end_time.hour, minute=end_time.minute)

                tz = pytz.timezone("America/Toronto")
                e = tz.localize(e)

                gymschedule = GymClassSchedule.objects.create(date=datetime.datetime(year=d.year,
                                                                                     month=d.month,
                                                                                     day=d.day).date(),
                                                              coach=User.objects.get(id=1),
                                                              parent_class=gym_class,
                                                              start_time=s,
                                                              end_time=e)

                gymschedule.save()

        gym_class.save()

        return Response({"success": True}, status=200)

    def ValidateData(self, data) -> dict:
        errors = {}
        for key in self.keys:
            if key not in data:
                errors[key] = "Missing Key"

        if 'day' not in errors and data["day"]:
            if data['day'] not in ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
                                   'Friday', 'Saturday', 'Sunday']:
                errors['day'] = "Wrong day name. Must be Monday, Tuesday, Wednesday," \
                                " Thursday, Friday, Saturday or Sunday"

        if 'earliest_date' not in errors and data["earliest_date"]:
            try:
                datetime.datetime.strptime(data['earliest_date'], '%d/%m/%Y')
            except ValueError:
                errors['earliest_date'] = "Wrong Start Date Format"

        if 'earliest_date' not in errors and data["earliest_date"]:
            start = datetime.datetime.strptime(data['earliest_date'], '%d/%m/%Y')
            tz = pytz.timezone('America/Toronto')
            start = start.replace(tzinfo=tz)
            present = timezone.now()
            if start <= present:
                errors['earliest_date'] = "Earliest date must be later than the current date"

        if 'last_date' not in errors and data["last_date"]:
            try:
                datetime.datetime.strptime(data['last_date'], '%d/%m/%Y').date()
            except ValueError:
                errors['last_date'] = "Wrong End Date Format"

        if 'start_time' not in errors and data["start_time"]:
            try:
                datetime.datetime.strptime(data['start_time'], '%H:%M').time()
            except ValueError:
                errors['start_time'] = "Wrong Start Time Format"

        if 'end_time' not in errors and data["end_time"]:
            try:
                datetime.datetime.strptime(data['end_time'], '%H:%M').time()
            except ValueError:
                errors['end_time'] = "Wrong End Time Format"

        return errors

    def daterange(self, date1, date2):
        for n in range(int((date2 - date1).days) + 1):
            yield date1 + timedelta(n)
