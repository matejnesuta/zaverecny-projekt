from rest_framework import serializers
from .models import Profile


# Serializer modelu Profile. Serializovat se dá více způsoby, ale tady mi vyhovoval ModelSerializer, protože stačí
# validovat podle toho, jak mám nastavený model.
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'profile_pic', 'bio']
