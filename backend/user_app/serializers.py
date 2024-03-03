from rest_framework import serializers
from rest_framework.validators import UniqueValidator
import json
from .models import CustomUser, Achievement, UserAchievement
from problem.models import Problem,  Submission, UserProblem,SavedProblem
from problem.serializers import TestCaseSerializer
from custom_mode.serializers import ManipulatorChoiceSerializer
from oneVone.models import OneVOne
from custom_mode.models import CustomModeSubmission
from time_mode.models import TimeModeSubmission
from quantity_mode.models import QuantityModeSubmission
from contest.models import ContestUser
from utils.utils import max_xp
from django.db.models import Count, F


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
    num_of_problem_attempted = serializers.SerializerMethodField()
    num_of_problem_solved = serializers.SerializerMethodField()
    num_of_problem_added = serializers.SerializerMethodField()
    num_of_contest_participated = serializers.SerializerMethodField()
    num_of_1_v_1_participated = serializers.SerializerMethodField()
    num_of_prob_solved_in_custom_mode = serializers.SerializerMethodField()
    num_of_prob_solved_in_quantity_mode = serializers.SerializerMethodField()
    num_of_prob_solved_in_time_mode = serializers.SerializerMethodField()
    maxi_xp = serializers.SerializerMethodField()
    num_of_1_v_1_won = serializers.SerializerMethodField()
    num_of_prob_attempted_in_custom_mode = serializers.SerializerMethodField()
    num_of_prob_attempted_in_time_mode = serializers.SerializerMethodField()
    num_of_prob_attempted_in_quantity_mode = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'level', 'xp', 'maxi_xp','image', 'username', 'email','num_of_problem_attempted','num_of_problem_solved','num_of_problem_added','num_of_contest_participated','num_of_1_v_1_participated','num_of_1_v_1_won','num_of_prob_attempted_in_custom_mode','num_of_prob_solved_in_custom_mode','num_of_prob_attempted_in_quantity_mode','num_of_prob_solved_in_quantity_mode','num_of_prob_attempted_in_time_mode','num_of_prob_solved_in_time_mode']

    def get_maxi_xp(self, obj):
        xp = obj.xp
        return max_xp(xp)
    def get_num_of_problem_attempted(self, obj):
        return Submission.objects.filter(user=obj).values('problem').annotate(total=Count('problem')).count()
    def get_num_of_problem_solved(self, obj):
        return Submission.objects.filter(user=obj,num_test_cases_passed=5).values('problem').annotate(total=Count('problem')).count()
    def get_num_of_problem_added(self, obj):
        return UserProblem.objects.filter(user=obj).count()
    def get_num_of_contest_participated(self, obj):
        return ContestUser.objects.filter(user=obj).count()
    def get_num_of_1_v_1_participated(self, obj):
        return OneVOne.objects.filter(primary_user=obj).union(OneVOne.objects.filter(secondary_user=obj)).count()
    def get_num_of_prob_solved_in_custom_mode(self, obj):
        return CustomModeSubmission.objects.filter(custom_mode__user=obj).filter(submission__num_test_cases_passed=5).count()
    def get_num_of_prob_solved_in_time_mode(self, obj):
        return TimeModeSubmission.objects.filter(time_mode__user=obj).filter(submission__num_test_cases_passed=5).count()
    def get_num_of_prob_solved_in_quantity_mode(self, obj):
        return QuantityModeSubmission.objects.filter(quantity_mode__user=obj).filter(submission__num_test_cases_passed=5).count()
    def get_num_of_1_v_1_won(self, obj): #TODO
        pu = OneVOne.objects.filter(primary_user=obj).filter(primary_user_score__gt=F('secondary_user_score')).count()
        su = OneVOne.objects.filter(secondary_user=obj).filter(secondary_user_score__gt=F('primary_user_score')).count()
        return pu+su
    def get_num_of_prob_attempted_in_custom_mode(self, obj):
        return CustomModeSubmission.objects.filter(custom_mode__user=obj).values('submission__problem').annotate(total=Count('submission__problem')).count()
    def get_num_of_prob_attempted_in_time_mode(self, obj):
        return TimeModeSubmission.objects.filter(time_mode__user=obj).values('submission__problem').annotate(total=Count('submission__problem')).count()
    def get_num_of_prob_attempted_in_quantity_mode(self, obj):
        return QuantityModeSubmission.objects.filter(quantity_mode__user=obj).values('submission__problem').annotate(total=Count('submission__problem')).count()
    




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
class UserProblemSerializer(serializers.ModelSerializer):
    problem = serializers.SerializerMethodField()
    class Meta:
        model = UserProblem
        fields = ['id','problem']
    def get_problem(self, obj):
        problem = obj.problem
        data = {
            'id': problem.id,
            'title': problem.title,
            'description': problem.description,
            'depth': problem.depth,
            'used_manipulator': problem.used_manipulator,
            'solve_count': problem.solve_count, 
            'try_count': problem.try_count,
            'addedAt': problem.addedAt
        }
        return data

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

class EditProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email','username','image']

#for online
class UserSavedProblemSerializer(serializers.ModelSerializer):
    problem = serializers.SerializerMethodField()
    class Meta:
        model = SavedProblem
        fields = ['id','problem']
    def get_problem(self, obj):
        problem = obj.problem
        data = {
            'id': problem.id,
            'title': problem.title,
            'description': problem.description,
            'depth': problem.depth,
            'used_manipulator': problem.used_manipulator,
            'solve_count': problem.solve_count, 
            'try_count': problem.try_count,
            'addedAt': problem.addedAt
        }
        return data