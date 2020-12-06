from rest_framework import serializers
from .models import Profile, Taskboard, Membership, Task, Log, Attachment, Comment


# Serializer modelu Profile. Serializovat se dá více způsoby, ale tady mi vyhovoval ModelSerializer, protože stačí
# validovat podle toho, jak mám nastavený model.
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'profile_pic', 'bio']


class TaskboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taskboard
        fields = '__all__'


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'author', 'title', 'description', 'deadline', 'stage', 'taskboard']


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        exclude = ['id']


class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['stage']


class UpdateTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'description', 'deadline', 'stage', ]


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = '__all__'


class UpdateAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        exclude = ['task']
