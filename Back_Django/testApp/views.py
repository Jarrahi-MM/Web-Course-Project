from rest_framework import authentication, status
from rest_framework.response import Response
from rest_framework.views import APIView


class Tests(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    @staticmethod
    def get(request):
        print("** Get **")
        print("Headers:", request.headers)
        print("Data:", request.data)
        print("Params:", request.query_params)
        return Response("Hello", status.HTTP_200_OK)

    @staticmethod
    def post(request):
        print("** Post **")
        print("Headers:", request.headers)
        print("Data:", request.data)
        print("Params:", request.query_params)
        return Response("Hello", status.HTTP_200_OK)

    @staticmethod
    def put(request):
        print("** Put **")
        print("Headers:", request.headers)
        print("Data:", request.data)
        print("Params:", request.query_params)
        return Response('', status.HTTP_200_OK)

    @staticmethod
    def delete(request):
        print("** Delete **")
        print("Headers:", request.headers)
        print("Data:", request.data)
        print("Params:", request.query_params)
        return Response("Hello", status.HTTP_200_OK)
