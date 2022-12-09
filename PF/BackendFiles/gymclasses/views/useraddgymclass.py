import rest_framework.parsers
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.core.validators import validate_email
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
import rest_framework.parsers

from PB.utility import ValidateInt, ValidatePhoneNumber
from accounts.models import GetUserExtension, HasSubscription, \
    UserClassInterface, UserExtension
from gymclasses.models import GymClass, GymClassSchedule

# Create your views here.

KEYS = [
    'password1',
    'password2',
    'first_name',
    'last_name',
    'email',
    'phone_num'
]

class AddGymClassSessionToUser(APIView):

    parser_classes = [
        rest_framework.parsers.JSONParser,
        rest_framework.parsers.FormParser,
        rest_framework.parsers.MultiPartParser
    ]

    permission_classes = [IsAuthenticated & HasSubscription]

    def get(self, request: Request, *args, **kwargs):
        from accounts.models import UserClassInterface
        classId = kwargs['session_id']
        try:
            gclasssched = GymClassSchedule.objects.get(id=classId)
        except ObjectDoesNotExist:
            return Response({'details': 'class session was not found'}, status=404)

        now = timezone.now()

        if gclasssched.end_time < now:
            return Response({'details': 'This class session has already ended'}, status=401)

        user = request.user
        uext = UserExtension.objects.get(user=user)

        if UserClassInterface.objects.filter(user=user, class_session=gclasssched).exists():
            uci = UserClassInterface.objects.get(user=user, class_session=gclasssched)
            if gclasssched.enrollment_count < gclasssched.enrollment_capacity:
                if uci.dropped:
                    uci.dropped = False
                    uci.financial_hold = False
                    gclasssched.enrollment_count += 1
                    uci.save()
                    gclasssched.save()
            return Response(
                {'details': 'You are already enrolled in this class session'},
                status=200)

        if gclasssched.enrollment_count < gclasssched.enrollment_capacity:
            newUCI = UserClassInterface.objects.create(user=user, class_session=gclasssched)
            newUCI.save()
            gclasssched.enrollment_count += 1
            gclasssched.save()
            uext.save()
            return Response({'details': 'You have successfully enrolled in this class session'}, status=200)

        return Response({'details': 'This class is full'}, status=401)


class RemoveGymClassSessionFromUser(APIView):
    '''
    edits a specific profile
    '''

    parser_classes = [
        rest_framework.parsers.JSONParser,
        rest_framework.parsers.FormParser,
        rest_framework.parsers.MultiPartParser
    ]

    permission_classes = [IsAuthenticated]

    def get(self, request: Request, *args, **kwargs):

        classId = kwargs['session_id']

        try:
            gclass = GymClassSchedule.objects.get(id=classId)
        except ObjectDoesNotExist:
            return Response({'details': 'class session was not found'}, status=404)

        now = timezone.now()
        if gclass.end_time < now:
            return Response({'details': 'This class session has already ended'}, status=401)

        user = request.user

        try:
            uci = UserClassInterface.objects.get(user=user, class_session=gclass)
            uci.dropped = True
            gclass.enrollment_count -= 1
            uci.save()
            gclass.save()
            return Response(
                {'details': 'You have successfully dropped this class session'},
                status=200)
        except ObjectDoesNotExist:
            return Response({'details': 'You are not enrolled in this class session'}, status=200)


class AddGymClassToUser(APIView):
    parser_classes = [
        rest_framework.parsers.JSONParser,
        rest_framework.parsers.FormParser,
        rest_framework.parsers.MultiPartParser
    ]

    permission_classes = [IsAuthenticated & HasSubscription]

    def get(self, request: Request, *args, **kwargs):

        classId = kwargs['class_id']
        try:
            gclass = GymClass.objects.get(id=classId)
        except ObjectDoesNotExist:
            return Response({'details': 'Class was not found'}, status=404)
        now = timezone.now()
        gcsq = GymClassSchedule.objects.filter(parent_class=gclass, start_time__gt=now)
        fullClasses = []
        user = request.user

        for gcs in gcsq:
            # gcs = GymClassSchedule()
            if gcs.enrollment_count < gcs.enrollment_capacity:
                if UserClassInterface.objects.filter(user=user, class_session=gcs).exists():
                    uci = UserClassInterface.objects.get(user=user, class_session=gcs)
                    if (uci.dropped or uci.financial_hold):
                        uci.dropped = False
                        uci.financial_hold = False
                        uci.save()
                else:
                    uci = UserClassInterface.objects.create(user=user, class_session=gcs)
                    uci.save()
                gcs.enrollment_count += 1
                gcs.save()
            else:
                fullClasses.append(gcs.id)

        return Response({'details': {'full_classes': fullClasses}}, status=200)

class RemoveGymClassFromUser(APIView):
    parser_classes = [
        rest_framework.parsers.JSONParser,
        rest_framework.parsers.FormParser,
        rest_framework.parsers.MultiPartParser
    ]

    permission_classes = [IsAuthenticated]

    def get(self, request: Request, *args, **kwargs):

        classId = kwargs['class_id']
        try:
            gclass = GymClass.objects.get(id=classId)
        except ObjectDoesNotExist:
            return Response({'details': 'Class was not found'}, status=404)
        now = timezone.now()
        user = request.user
        ucis = UserClassInterface.objects.filter(user=user, class_session__start_time__gt=now, class_session__parent_class=gclass)

        for uci in ucis:
            uci.dropped = True
            uci.class_session.enrollment_count -= 1
            uci.save(0)
            uci.class_session.save()

        return Response({'details': 'class successfully unenrolled'}, status=200)


class DropAllClasses(APIView):
    parser_classes = [
        rest_framework.parsers.JSONParser,
        rest_framework.parsers.FormParser,
        rest_framework.parsers.MultiPartParser
    ]

    permission_classes = [IsAuthenticated]

    def get(self, request: Request, *args, **kwargs):

        now = timezone.now()

        ucis = UserClassInterface.objects.filter(user=request.user, class_session__start_time__gt=now)

        for uci in ucis:
            uci.dropped = True
            uci.class_session.enrollment_count -= 1
            uci.save()
            uci.class_session.save()

        return Response({'details': 'classes successfully unenrolled'}, status=200)
