from rest_framework import serializers
from .models import Profile, Taskboard, Membership, Task, Log


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
        fields = ['id', 'author', 'title', 'description', 'deadline', 'stage']


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        exclude = ['id']
