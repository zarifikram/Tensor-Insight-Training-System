from rest_framework import serializers
from .models import Contest, ContestProblem, UserContest
from user_app.serializers import UserAddProblemSerializer

# Contest Serializer
class ContestSerializer(serializers.ModelSerializer):
    problem_list = serializers.SerializerMethodField()

    def get_problem_list(self, contest):
        problems = ContestProblem.objects.filter(contest=contest).order_by('problem_number')
        return [{'id': problem.problem.id, 'solve_count':problem.problem.solve_count,'try_count':problem.problem.try_count} for problem in problems]

    class Meta:
        model = Contest
        fields = ['title', 'start_time', 'end_time', 'problem_list']

class ContestListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    users_count = serializers.IntegerField()


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
        fields = ['contest','c_id', 'password', 'num_random_problem']


class AddProblemToContestSerializer(serializers.ModelSerializer):
    problem  = UserAddProblemSerializer()
    class Meta:
        model = ContestProblem
        fields = ['problem', 'problem_number']

class AddUserToContestSerializer(serializers.Serializer):
    c_id = serializers.CharField()
    password = serializers.CharField()


