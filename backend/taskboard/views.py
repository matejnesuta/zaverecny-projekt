from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from .models import Profile
from .serializers import ProfileSerializer


# Endpoint pro zobrazení profilu ostatních uživatelů.
@api_view(['GET', ])
@permission_classes((IsAuthenticated,))
def get_profile_detail(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

# Endpoint pro získání nebo úpravu vlastního profilu.
@api_view(['GET', 'PUT'])
@permission_classes((IsAuthenticated,))
def profile(request):
    try:
        profile = Profile.objects.get(pk=request.user.pk)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = ProfileSerializer(profile, data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data["success"] = "update successful"
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
