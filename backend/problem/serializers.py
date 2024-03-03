from rest_framework import serializers
from .models import CustomUser, Problem, TestCase, Submission, Discussion, DiscussionVote

class ProblemSetSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()

    class Meta:
        model = Problem
        fields = ['id', 'difficulty', 'used_manipulator', 'solve_count', 'try_count', 'depth', 'is_user_added', 'addedAt', 'status']

    def get_status(self, obj):
        user = self.context['request'].user

        # If the user is anonymous, exclude the 'status' attribute
        if user.is_anonymous:
            return None

        # Get the latest submission for the user and the current problem
        submission = Submission.objects.filter(user=user, problem=obj).order_by('-timestamp').first()

        if submission:
            # If the user has submitted, check if all test cases passed
            if submission.num_test_cases_passed == submission.num_test_cases:
                return 'solved'
            else:
                return 'tried'
        else:
            return 'not tried'
        
class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = ['input', 'output','test_case_no']

class ModeProblemSerializer(serializers.ModelSerializer):
    test_cases = TestCaseSerializer(many=True, read_only=True, source='testcase_set')

    class Meta:
        model = Problem
        fields = ['id','test_cases','used_manipulator']

class ProblemDetailsSerializer(serializers.ModelSerializer):
    test_cases = TestCaseSerializer(many=True, read_only=True, source='testcase_set')

    class Meta:
        model = Problem
        fields = ['id','title','description', 'difficulty', 'used_manipulator', 'solve_count', 'try_count', 'addedAt', 'test_cases','solution','editorial_image','show_code','depth','is_user_added']
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Check if show_code is False and exclude solution
        if not instance.show_code:
            data.pop('solution')
            data.pop('editorial_image')
            data.pop('used_manipulator')
        if instance.is_user_added:
            pass
        return data

class UserSerializer2(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'level', 'xp', 'image']

# Submission Serializer
class SubmissionSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    problem = serializers.SerializerMethodField()
    class Meta:
        model = Submission
        fields = ['id', 'user', 'problem', 'num_test_cases', 'num_test_cases_passed', 'taken_time', 'timestamp', 'code','test_case_verdict']

    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'first_name': obj.user.first_name,
            'last_name': obj.user.last_name
        }

    def get_problem(self, obj):
        return {
            'id': obj.problem.id
        }
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        prb = Problem.objects.get(id=data['problem']['id'])
        if not prb.show_code:
            data.pop('code')
        return data

class ProblemSubmitSerializer(serializers.ModelSerializer): #changed
    class Meta:
        model = Submission
        fields = ['code', 'taken_time']

class ProblemSubmissionListSerializer(serializers.ModelSerializer): #changed
    user = serializers.SerializerMethodField()

    class Meta:
        model = Submission
        fields = ['id', 'user', 'num_test_cases', 'num_test_cases_passed','test_case_verdict' ,'taken_time', 'timestamp']

    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'username': obj.user.username,
        }


# Discussion Serializer
class AddDiscussionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discussion
        fields = ['comment']

class DiscussionVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscussionVote
        fields = ['id', 'discussion', 'user', 'vote']

class DiscussionSerializer(serializers.ModelSerializer):
    user = UserSerializer2()
    timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    vote = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()
    user_vote = serializers.SerializerMethodField()

    class Meta:
        model = Discussion
        fields = ['id', 'user', 'comment', 'timestamp', 'vote', 'user_vote','replies']

    def get_vote(self, obj):
        upvotes = obj.discussionvote_set.filter(vote='up').count()
        downvotes = obj.discussionvote_set.filter(vote='down').count()
        return upvotes - downvotes

    def get_replies(self, obj):
        request = self.context.get('request')
        replies = Discussion.objects.filter(parent_comment=obj)
        serializer = DiscussionSerializer(replies, many=True, context={'request': request})
        return serializer.data
    
    def get_user_vote(self, obj):
        user = self.context['request'].user
        if user.is_anonymous:
            return None
        vote = DiscussionVote.objects.filter(discussion=obj, user=user).first()
        if vote:
            return vote.vote
        else:
            return None

class RunProblemSerializer(serializers.Serializer):
    test_cases = serializers.JSONField()
    code = serializers.CharField()
