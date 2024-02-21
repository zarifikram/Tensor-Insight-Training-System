from rest_framework import serializers
from .models import Contest, ContestProblem, UserContest, ContestUser
from user_app.serializers import UserAddProblemSerializer
from django.utils import timezone
from django.utils.dateparse import parse_datetime

# Contest Serializer
class ContestSerializer(serializers.ModelSerializer):
    problem_list = serializers.SerializerMethodField()
    users_count = serializers.SerializerMethodField()

    def get_users_count(self, contest):
        return ContestUser.objects.filter(contest=contest).count()
    def get_problem_list(self, contest):
        problems = ContestProblem.objects.filter(contest=contest).order_by('problem_number')
        return [{'id': problem.problem.id, 'solve_count':problem.problem.solve_count,'try_count':problem.problem.try_count} for problem in problems]
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if parse_datetime(ret['start_time']) > timezone.now():
            ret['status'] = 'Upcoming'
            ret.pop('problem_list')
        elif parse_datetime(ret['start_time'])<= timezone.now() and parse_datetime(ret['end_time']) >= timezone.now():
            ret['status'] = 'Running'
        else:
            ret['status'] = 'Ended'
        return ret
    

    class Meta:
        model = Contest
        fields = ['id','title', 'start_time', 'end_time', 'users_count','problem_list']

class ContestListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    users_count = serializers.IntegerField()
    is_user_added = serializers.BooleanField()
    start_time = serializers.DateTimeField()
    end_time = serializers.DateTimeField()


# ContestProblem Serializer
class ContestProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContestProblem
        fields = '__all__'

# Create Contest Serializer
class ContestSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Contest
        fields = ['title', 'start_time', 'end_time']

class CreateContestSerializer(serializers.ModelSerializer):
    # Set default value for num_random_problem
    num_random_problem = serializers.IntegerField(required=False,default=0)

    contest = ContestSerializer2()  # Use the ContestSerializer for the Contest model

    class Meta:
        model = UserContest
        fields = ['contest','c_id', 'passkey', 'num_random_problem']


class AddProblemToContestSerializer(serializers.ModelSerializer):
    problem  = UserAddProblemSerializer()
    class Meta:
        model = ContestProblem
        fields = ['problem', 'problem_number']

class AddUserToContestSerializer(serializers.Serializer):
    c_id = serializers.CharField()
    passkey = serializers.CharField()


