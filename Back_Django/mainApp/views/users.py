from rest_framework import authentication, status, permissions
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView


@permission_classes((permissions.IsAuthenticated,))
class Users(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def put(request):
        user = request.user
        user.first_name = (request.data['first_name'])
        user.last_name = (request.data['last_name'])
        user.email = (request.data['email'])
        user.save()
        return Response("user updated", status=status.HTTP_200_OK)
