from rest_framework import serializers
from .models import OneVOne, OneVOneProblem, OneVOneSubmission
from problem.models import Submission, Problem
from django.utils import timezone
from django.utils.dateparse import parse_datetime

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
        fields = ['title','description','key' ,'duration', 'status','num_of_problem','user1','user2','started_at','problem_list']
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
        return {'username':oneVone.primary_user.username, 'id':oneVone.primary_user.id, 'score':oneVone.primary_user_score}
    def get_user2(self, oneVone):
        return {'username':oneVone.secondary_user.username, 'id':oneVone.secondary_user.id, 'score':oneVone.secondary_user_score} if oneVone.secondary_user else None
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if ret['status'] == 'created':
            ret.pop('problem_list')
        elif ret['status'] == 'ended':
            if ret['user1']['score'] > ret['user2']['score']:
                ret['winner'] = ret['user1']['username']
            elif ret['user1']['score'] < ret['user2']['score']:
                ret['winner'] = ret['user2']['username']
            else:
                ret['winner'] = 'Draw'
        return ret
    
    


