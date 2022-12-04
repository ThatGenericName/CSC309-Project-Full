from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import *


# Create your views here.

class ViewSingleAmenity(APIView):
    '''
    Views a specific account
    '''

    permission_classes = []

    def get(self, request: Request, format=None, *args, **kwargs):

        try:
            Amenity.objects.get(id=kwargs["amenity_id"])
        except ObjectDoesNotExist:
            return Response({"Studio Does not exist"}, status=404)

        amenity = Amenity.objects.get(id=kwargs["amenity_id"])

        s = AmenitySerializer(amenity).data

        return Response(s, status=200)
