from rest_framework import serializers
from .models import TimeMode, TimeModeSubmission
from problem.serializers import ModeProblemSerializer

# TimeMode Serializer
class TimeModeSerializer(serializers.ModelSerializer):
    current_problem = ModeProblemSerializer()
    class Meta:
        model = TimeMode
        fields = ['current_problem_num', 'time','current_problem']

class TimeModeCreateSerializer(serializers.ModelSerializer):
    time = serializers.ChoiceField(choices=[('600', '600'),
        ('1800', '1800'),
        ('3600', '3600'),])
    class Meta:
        model = TimeMode
        fields = ['time']

# TimeModeSubmission Serializer
class TimeModeLeaderboardSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = TimeMode
        fields = ['user', 'current_problem_num', 'timestamp']
        
    def get_user(self, instance):
        return {
            'id': instance.user.id,
            'username': instance.user.username,
        }
