from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from .models import Profile, Taskboard, Membership, Task
from .serializers import ProfileSerializer, TaskboardSerializer, MembershipSerializer, TaskSerializer


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


# Endpoint pro získání všech boardů, ve kterých je uživatel aspoň členem. V podstatě vrací jen jméno a id, ale pro
# nějakou úvodní obrazovku po přihlášení to stačí.
@api_view(['GET', ])
@permission_classes((IsAuthenticated,))
def get_boards(request):
    if request.method == "GET":
        boards = Taskboard.objects.filter(membership__profile=request.user.pk)
        serializer = TaskboardSerializer(boards, many=True)
        return Response(serializer.data)


# Endpoint pro úpravu jména tabule a nebo její smazání. Nejdříve se zkontroluje, zda tabule existuje. Poté jestli má
# daný uživatel oprávnění k jejím úpravám (k tomu slouží role owner). Nakonec se funkce větví na úpravu a nebo smazání
# (záleží na typu requestu).
@api_view(['PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
def board(request, pk):
    try:
        board = Taskboard.objects.get(pk=pk)
    except Taskboard.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    query = Membership.objects.values("profile").filter(taskboard=board, profile=request.user.pk,
                                                        role__contains="owner")
    data = {}
    if query.count() == 0:
        data["failure"] = "you are not allowed to alter this"
        return Response(data=data, status=status.HTTP_403_FORBIDDEN)

    if request.method == "PUT":
        serializer = TaskboardSerializer(board, data=request.data)
        if serializer.is_valid():
            serializer.save()
            data["success"] = "update successful"
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        operation = board.delete()
        if operation:
            data["success"] = "delete successful"
        else:
            data["failure"] = "delete failed"
        return Response(data=data)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def create_board(request):
    if request.method == "POST":
        board = Taskboard()
        serializer = TaskboardSerializer(board, data=request.data)
        data = {}
        owner = Profile.objects.get(pk=request.user.id)
        if serializer.is_valid():
            serializer.save()
            ownership = Membership(profile=owner, taskboard=Taskboard.objects.get(pk=board.id), role="owner")
            ownership.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_board_detail(request, pk):
    if request.method == "GET":
        try:
            tasks = Task.objects.filter(taskboard=pk)
        except Taskboard.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        query = Membership.objects.values("profile").filter(taskboard=pk, profile=request.user.pk)

        if query.count() == 0:
            data = {}
            data["failure"] = "you are not allowed to view this content"
            return Response(data=data, status=status.HTTP_403_FORBIDDEN)

        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
