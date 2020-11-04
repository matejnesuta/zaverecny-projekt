from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'profile_pic', 'bio']

    def create(self, validated_data):
        return Profile.objects.create(validated_data)

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first name', instance.first_name)
        instance.last_name = validated_data.get('last name', instance.last_name)
        instance.profile_pic = validated_data.get('profile pic', instance.profile_pic)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.save()
        return instance
