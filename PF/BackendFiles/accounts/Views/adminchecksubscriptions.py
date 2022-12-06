from rest_framework.permissions import IsAdminUser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.management.manageactivesubscriptions import \
    ManageActiveSubscriptions


class AdminCheckSubscriptions(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request: Request):
        ManageActiveSubscriptions()
        return Response(status=200)


