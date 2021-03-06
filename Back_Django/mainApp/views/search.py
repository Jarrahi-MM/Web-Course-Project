from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Channel, Post
from ..serializers import SearchViewSerializer


@api_view()
def search(request):  # todo use whoosh
    search_string = request.query_params.get('q')
    search_result = {'Users': list(User.objects.filter(username__icontains=search_string)),
                     'Channels': list(Channel.objects.filter(channelName__icontains=search_string)),
                     'Posts': list(Post.objects.filter(postTitle__icontains=search_string))}
    serializer = SearchViewSerializer(search_result)
    return Response(serializer.data, status=status.HTTP_200_OK)
