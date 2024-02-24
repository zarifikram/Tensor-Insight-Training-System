from rest_framework import serializers
from .models import OneVOne, OneVOneProblem, OneVOneSubmission
from problem.models import Submission, Problem
from django.utils import timezone
from django.utils.dateparse import parse_datetime

# Contest Serializer
# class ContestSerializer(serializers.ModelSerializer):
#     problem_list = serializers.SerializerMethodField()
#     users_count = serializers.SerializerMethodField()

#     def get_users_count(self, contest):
#         return ContestUser.objects.filter(contest=contest).count()
#     def get_problem_list(self, contest):
#         problems = ContestProblem.objects.filter(contest=contest).order_by('problem_number')
#         return [{'id': problem.problem.id, 'solve_count':problem.problem.solve_count,'try_count':problem.problem.try_count} for problem in problems]
#     def to_representation(self, instance):
#         ret = super().to_representation(instance)
#         if parse_datetime(ret['start_time']) > timezone.now():
#             ret['status'] = 'Upcoming'
#             ret.pop('problem_list')
#         elif parse_datetime(ret['start_time'])<= timezone.now() and parse_datetime(ret['end_time']) >= timezone.now():
#             ret['status'] = 'Running'
#         else:
#             ret['status'] = 'Ended'
#         return ret
    

#     class Meta:
#         model = Contest
#         fields = ['id','title', 'start_time', 'end_time', 'users_count','problem_list']

# class ContestListSerializer(serializers.Serializer):
#     id = serializers.IntegerField()
#     title = serializers.CharField()
#     users_count = serializers.IntegerField()
#     is_user_added = serializers.BooleanField()
#     start_time = serializers.DateTimeField()
#     end_time = serializers.DateTimeField()


# # ContestProblem Serializer
# class ContestProblemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ContestProblem
#         fields = '__all__'

# # Create Contest Serializer
# class ContestSerializer2(serializers.ModelSerializer):
#     class Meta:
#         model = Contest
#         fields = ['title', 'start_time', 'end_time']

class CreateOneVOneSerializer(serializers.ModelSerializer):
    class Meta:
        model = OneVOne
        fields = ['title','description', 'duration', 'num_of_problem']

class OneVOneSerializer(serializers.ModelSerializer):
    problem_list = serializers.SerializerMethodField()
    user1 = serializers.SerializerMethodField()
    user2 = serializers.SerializerMethodField()
    class Meta:
        model = OneVOne
        fields = ['title','description', 'duration', 'num_of_problem','user1','user2','started_at','problem_list']
    def get_problem_list(self, oneVone):
        problems = OneVOneProblem.objects.filter(oneVone=oneVone).order_by('problem_number')
        ret = dict()
        for problem in problems:
            s1 = Submission.objects.filter(problem=problem.problem, user=oneVone.primary_user, num_test_cases_passed=5).first()
            s2 = Submission.objects.filter(problem=problem.problem, user=oneVone.secondary_user, num_test_cases_passed=5).first()
            if s1:
                time_diff = s1.timestamp-oneVone.started_at
                is_user1_solved = time_diff.total_seconds()
            else:
                is_user1_solved = -1
            if s2:
                time_diff = s2.timestamp-oneVone.started_at
                is_user2_solved = time_diff.total_seconds()
            else:
                is_user2_solved = -1
            ret[problem.problem_number] = {'id': problem.problem.id, 'is_user1_solved':is_user1_solved,'is_user2_solved':is_user2_solved}
        return ret
    def get_user1(self, oneVone):
        return {'username':oneVone.primary_user.username, 'id':oneVone.primary_user.id}
    def get_user2(self, oneVone):
        return {'username':oneVone.primary_user.username, 'id':oneVone.primary_user.id} if oneVone.secondary_user else None
    
    


