from rest_framework import serializers
from django.db.models import Count
from .models import CustomUser, InitiatorChoice,  CustomMode, ManipulatorChoice


class ManipulatorChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManipulatorChoice
        fields = "__all__"

class InitiatorChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = InitiatorChoice
        fields = "__all__"

class CustomModeSettingSerializer(serializers.ModelSerializer):
    manipulator = ManipulatorChoiceSerializer()
    initiator = InitiatorChoiceSerializer()
    class Meta:
        model = CustomMode
        fields = ["depth", "initiator", "manipulator"]

class CustomModeLeaderboardSerializer(serializers.ModelSerializer):
    solved_problems = serializers.IntegerField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'solved_problems']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data

    def get_queryset(self):
        return CustomUser.objects.annotate(solved_problems=Count('custommode__custommodesubmission__submission__problem', distinct=True))

