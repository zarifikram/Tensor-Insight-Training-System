from rest_framework import serializers
from .models import CustomUser, Problem, TestCase, Submission, Discussion, DiscussionVote, Editorial, EditorialComment, EditorialCommentVote, EditorialVote, Contest, ContestProblem, ContestSubmission, ContestUser, QuantityMode, QuantityModeSubmission, TimeMode, TimeModeSubmission, CustomMode, CustomModeSubmission, Achievement, UserAchievement, UserProblem

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

# Problem Serializer
class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = '__all__'

# TestCase Serializer
class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = '__all__'

# Submission Serializer
class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = '__all__'

# Discussion Serializer
class DiscussionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discussion
        fields = '__all__'

# DiscussionVote Serializer
class DiscussionVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscussionVote
        fields = '__all__'

# Editorial Serializer
class EditorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Editorial
        fields = '__all__'

# EditorialComment Serializer
class EditorialCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = EditorialComment
        fields = '__all__'

# EditorialCommentVote Serializer
class EditorialCommentVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = EditorialCommentVote
        fields = '__all__'

# EditorialVote Serializer
class EditorialVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = EditorialVote
        fields = '__all__'

# Contest Serializer
class ContestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contest
        fields = '__all__'

# ContestProblem Serializer
class ContestProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContestProblem
        fields = '__all__'

# ContestSubmission Serializer
class ContestSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContestSubmission
        fields = '__all__'

# ContestUser Serializer
class ContestUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContestUser
        fields = '__all__'

# QuantityMode Serializer
class QuantityModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuantityMode
        fields = '__all__'

# QuantityModeSubmission Serializer
class QuantityModeSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuantityModeSubmission
        fields = '__all__'

# TimeMode Serializer
class TimeModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeMode
        fields = '__all__'

# TimeModeSubmission Serializer
class TimeModeSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeModeSubmission
        fields = '__all__'

# CustomMode Serializer
class CustomModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomMode
        fields = '__all__'

# CustomModeSubmission Serializer
class CustomModeSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomModeSubmission
        fields = '__all__'

# Achievement Serializer
class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'

# UserAchievement Serializer
class UserAchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAchievement
        fields = '__all__'

# userProblem Serializer
class userProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProblem
        fields = '__all__'
