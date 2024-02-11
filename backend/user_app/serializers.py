from rest_framework import serializers
from rest_framework.validators import UniqueValidator
import json
from .models import CustomUser, Achievement, UserAchievement
from problem.models import Problem, TestCase, Submission, UserProblem
from problem.serializers import TestCaseSerializer
from custom_mode.serializers import ManipulatorChoiceSerializer


class SignUpSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150, validators=[UniqueValidator(queryset=CustomUser.objects.all())], required=True)
    email = serializers.EmailField(validators=[UniqueValidator(queryset=CustomUser.objects.all())], required=True)
    first_name = serializers.CharField(max_length=30, required=True)
    last_name = serializers.CharField(max_length=30, required=True)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    confirm_password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password']
        )
        return user
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})  

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if not username:
            raise serializers.ValidationError("Username is required.")

        if not password:
            raise serializers.ValidationError("Password is required.")

        return data
    
# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'level', 'xp', 'image', 'username', 'email']



class UserSubmissionListSerializer(serializers.ModelSerializer):
    problem = serializers.SerializerMethodField()

    class Meta:
        model = Submission
        fields = ['id', 'problem', 'num_test_cases', 'num_test_cases_passed', 'taken_time', 'timestamp']

    def get_problem(self, obj):
        return {
            'id': obj.problem.id
        }


# Achievement Serializer
class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'

# UserAchievement Serializer
class UserAchievementSerializer(serializers.ModelSerializer):
    achievement = AchievementSerializer(many=True)
    class Meta:
        model = UserAchievement
        fields = ['achievement']

# userProblem Serializer
class userProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProblem
        fields = '__all__'

class UserAddProblemSerializer(serializers.ModelSerializer):
    used_manipulator = ManipulatorChoiceSerializer(required=False, default={})
    test_cases = TestCaseSerializer(many=True, source='testcase_set')
    title = serializers.CharField(max_length=100, default="Untitled Problem")
    description = serializers.CharField(max_length=1000, default="No description")
    depth = serializers.IntegerField(default=-1)
    solution = serializers.CharField(max_length=1000, default="No solution")
    editorial_image = serializers.ImageField(required=False, default=None)

    class Meta:
        model = Problem
        fields = ['title', 'description', 'depth', 'used_manipulator', 'test_cases', 'solution', 'editorial_image']
