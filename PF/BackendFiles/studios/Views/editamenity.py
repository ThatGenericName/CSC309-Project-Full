import rest_framework.parsers
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
import rest_framework.parsers

from PB.utility import *

from ..models import *


class EditAmenity(APIView):
    '''
    edits amenity in db
    '''

    parser_classes = [
        rest_framework.parsers.JSONParser,
        rest_framework.parsers.FormParser,
        rest_framework.parsers.MultiPartParser
    ]
    keys = [
        'type',
        'quantity'
    ]

    # permission_classes = [IsAdminUser]

    def post(self, request: Request, *args, **kwargs):

        if not Amenity.objects.filter(pk=kwargs['pk']):
            return Response({'error':"Amenity Does not Exist"}, status=404)

        errors = self.ValidateData(request.data)

        if len(errors):
            return Response(errors, status=400)

        amenity = Amenity.objects.get(pk=kwargs['pk'])

        data = request.data
        if data['quantity']:
            amenity.quantity = data['quantity']
        if data['type']:
            amenity.type = data['type']
        amenity.studio = amenity.studio

        amenity.save()
        return Response({"success": True}, status=200)

    def ValidateData(self, data) -> dict:
        """
        Function to validate the input data

        """
        errors = {}
        for key in self.keys:
            if key not in data:
                errors[key] = "Missing Key"


        if "quantity" not in errors and data["quantity"]:
            try:
                int(data["quantity"])
            except ValueError:
                errors["quantity"] = "Wrong Quantity input type"

        return errors
