from rest_framework import serializers
from .models import  QuantityMode
from user_app.models import CustomUser
from problem.serializers import ModeProblemSerializer

class QuantityModeSerializer(serializers.ModelSerializer):
    current_problem = ModeProblemSerializer()
    class Meta:
        model = QuantityMode
        fields = ['current_problem_num', 'number_of_problems','current_problem']
        
class QuantityModeCreateSerializer(serializers.Serializer):
    number_of_problems = serializers.IntegerField()

# QuantityModeSubmission Serializer
class QuantityModeLeaderboardSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    number_of_problems = serializers.IntegerField()

    class Meta:
        model = QuantityMode
        fields = ['user', 'number_of_problems', 'timestamp']

    def get_user(self, instance):
        return {
            'id': instance.user.id,
            'username': instance.user.username,
        }