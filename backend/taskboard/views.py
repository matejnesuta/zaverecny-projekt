from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from .models import Profile, Taskboard, Membership
from .serializers import ProfileSerializer, TaskboardSerializer, MembershipSerializer


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


@api_view(['GET', ])
@permission_classes((IsAuthenticated,))
def get_boards(request):
    if request.method == "GET":
        boards = Taskboard.objects.filter(membership__profile=request.user.pk)
        serializer = TaskboardSerializer(boards, many=True)
        return Response(serializer.data)


@api_view(['PUT', ])
@permission_classes((IsAuthenticated,))
def update_board(request, pk):
    try:
        board = Taskboard.objects.get(pk=pk)
    except Taskboard.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    query = Membership.objects.values("profile").filter(taskboard=board, profile=request.user.pk,
                                                        role__contains="owner")
    if query.count() == 0:
        return Response(status=status.HTTP_403_FORBIDDEN)


    elif request.method == "PUT":
        serializer = TaskboardSerializer(board, data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data["success"] = "update successful"
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
