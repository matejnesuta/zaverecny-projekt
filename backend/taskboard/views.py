from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from .models import Profile, Taskboard, Membership, Task, Log, Comment
from .serializers import *
from django.db.models import Q
from functools import reduce


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


# Endpoint, který vrátí profily členů jedné tabule seřazené podle rolí.
@api_view(['GET', ])
@permission_classes((IsAuthenticated,))
def get_users(request, pk):
    try:
        board = Taskboard.objects.get(pk=pk)
    except Taskboard.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if Membership.objects.values("profile").filter(taskboard=board, profile=request.user.pk).count() != 0:
        profiles = Membership.objects.filter(taskboard=pk).order_by("-role")
        serializer = BoardProfilesSerializer(profiles, many=True)
        return Response(serializer.data)
    return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', ])
@permission_classes((IsAuthenticated,))
def search_for_users(request):
    pass


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


# Vytvoření tabule. Uživatel, který tabuli vytvořil, se stane jejím vlastníkem.
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


# Vrácení detailů boardu, tj. všechny úkoly, které jsou na scrumboardu.  
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


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_log(request, pk):
    if request.method == "GET":

        query = Membership.objects.values("profile").filter(taskboard=pk, profile=request.user.pk)

        if query.count() == 0:
            data = {}
            data["failure"] = "you are not allowed to view this content"
            return Response(data=data, status=status.HTTP_403_FORBIDDEN)

        log = Log.objects.filter(board=pk)
        serializer = LogSerializer(log, many=True)
        return Response(serializer.data)


# Vytvoření úkolu a zapsání události do logu.
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def create_task(request):
    if request.method == "POST":
        author = Profile.objects.get(pk=request.user.pk)

        query = Membership.objects.values("profile").filter(taskboard=request.data.get("taskboard"),
                                                            profile=request.user.pk)

        if query.count() == 0:
            return Response(status=status.HTTP_403_FORBIDDEN)
        task = Task()
        request.data["author"] = author.id
        serializer = TaskSerializer(task, data=request.data)
        data = {}

        if serializer.is_valid():
            serializer.save()
            log = Log(text=f"{author.first_name} {author.last_name} právě přidal úkol: {serializer.data['title']}",
                      board=Taskboard.objects.get(pk=serializer.data["taskboard"]),
                      task=Task.objects.get(id=serializer.data['id']),
                      profile=author)
            log.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH', 'DELETE', 'GET'])
@permission_classes((IsAuthenticated,))
def task(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    data = {}
    membership = Membership.objects.filter((Q(role__contains='owner') | Q(role__contains='moderator')),
                                           taskboard=Task.objects.values("taskboard").get(id=pk)["taskboard"],
                                           profile=request.user.pk).count()
    if request.method == "GET":
        if Membership.objects.filter(taskboard=Task.objects.values("taskboard").get(id=pk)["taskboard"],
                                     profile=request.user.pk).count():
            serializer = TaskSerializer(task)
            return Response(serializer.data)
        data["failure"] = "you are not allowed to view this"
        return Response(data=data, status=status.HTTP_403_FORBIDDEN)

    if request.method == "PATCH":
        if Task.objects.filter(author=request.user.id, id=pk).count() != 0:
            serializer = UpdateTaskSerializer(task, data=request.data, partial=True)
        elif membership != 0:
            serializer = StageSerializer(task, data=request.data, partial=True, )
        else:
            return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)

        if serializer.is_valid():
            serializer.save()
            data["success"] = "update successful"
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        if membership != 0 or Task.objects.filter(author=request.user.id, id=pk).count() != 0:
            operation = task.delete()
            if operation:
                data["success"] = "delete successful"
            else:
                data["failure"] = "delete failed"
            return Response(data=data)
        return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def add_attachment(request):
    data = {}
    try:
        membership = Membership.objects.filter(
            taskboard=Task.objects.values("taskboard").get(id=request.data["task"])["taskboard"],
            profile=request.user.pk).count()
    except KeyError:
        data["failure"] = "id field not found"
        return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        data["failure"] = "field id must contain an integer"
        return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if membership == 0:
        data["failure"] = "you are not allowed to POST to this board"
        return Response(status=status.HTTP_403_FORBIDDEN)

    attachment = Attachment()
    serializer = AttachmentSerializer(attachment, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH', 'DELETE', 'GET'])
@permission_classes((IsAuthenticated,))
def attachment(request, pk):
    try:
        attachment = Attachment.objects.get(pk=pk)
    except Attachment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    data = {}
    ownership = Task.objects.values("id").filter(attachment=pk, author=request.user.pk).count()
    membership = Membership.objects.filter((Q(role__contains='owner') | Q(role__contains='moderator')),
                                           taskboard=Task.objects.values("taskboard").get(attachment=pk)["taskboard"],
                                           profile=request.user.pk).count()

    if request.method == "GET":
        if Membership.objects.filter(taskboard=Task.objects.values("taskboard").get(attachment=pk)["taskboard"],
                                     profile=request.user.pk).count():
            serializer = AttachmentSerializer(attachment)
            return Response(serializer.data)
        data["failure"] = "you are not allowed to view this"
        return Response(data=data, status=status.HTTP_403_FORBIDDEN)

    if request.method == "PATCH":
        if ownership == 0:
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = UpdateAttachmentSerializer(attachment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            data["success"] = "update successful"
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        if membership != 0 or ownership != 0:
            operation = attachment.delete()
            if operation:
                data["success"] = "delete successful"
            else:
                data["failure"] = "delete failed"
            return Response(data=data)
        return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def comments(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if Membership.objects.filter(taskboard=Task.objects.values("taskboard").get(id=pk)["taskboard"],
                                 profile=request.user.pk).count():
        if request.method == 'GET':
            comments = Comment.objects.filter(task=task)
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
        else:
            comment = Comment()
            serializer = PostCommentSerializer(comment, data=request.data)
            if serializer.is_valid():
                serializer.validated_data["author"] = Profile.objects.get(id=request.user.pk)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated,))
def delete_comment(request, pk):
    try:
        comment = Comment.objects.get(pk=pk)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    ownership = Task.objects.values("id").filter(comment=pk, author=request.user.pk).count()
    membership = Membership.objects.filter((Q(role__contains='owner') | Q(role__contains='moderator')),
                                           taskboard=Task.objects.values("taskboard").get(comment=pk)["taskboard"],
                                           profile=request.user.pk).count()

    if ownership != 0 or membership != 0:
        data = {}
        operation = comment.delete()
        if operation:
            data["success"] = "delete successful"
        else:
            data["failure"] = "delete failed"
        return Response(data=data)
    return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated,))
def invite(request, id):
    query = Membership.objects.values("profile").filter((Q(role__contains='owner') | Q(role__contains='moderator')),
                                                        taskboard=id, profile=request.user.pk)
    data = {}
    if query.count == 0:
        data["failure"] = "You are not allowed to do this!"
        return Response(data=data, status=status.HTTP_403_FORBIDDEN)

    membership = Membership()
    serializer = MembershipSerializer(membership, data=request.data)
    if serializer.is_valid():
        serializer.validated_data["taskboard"] = Taskboard.objects.get(id=id)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
