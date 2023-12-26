from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from firebase_admin import credentials, auth
from django.contrib.auth import login, logout, authenticate

from .models import (
    CustomUser, Problem, TestCase, Submission,
    Discussion, DiscussionVote, Editorial,
    EditorialComment, EditorialCommentVote, EditorialVote,
    Contest, ContestProblem, ContestSubmission, ContestUser,
    QuantityMode, QuantityModeSubmission,
    TimeMode, TimeModeSubmission,
    CustomMode, CustomModeSubmission,
    Achievement, UserAchievement, UserProblem
)

from .serializers import (
    UserSerializer, ProblemSerializer, TestCaseSerializer, SubmissionSerializer,
    DiscussionSerializer, DiscussionVoteSerializer, EditorialSerializer,
    EditorialCommentSerializer, EditorialCommentVoteSerializer, EditorialVoteSerializer,
    ContestSerializer, ContestProblemSerializer, ContestSubmissionSerializer, ContestUserSerializer,
    QuantityModeSerializer, QuantityModeSubmissionSerializer,
    TimeModeSerializer, TimeModeSubmissionSerializer,
    CustomModeSerializer, CustomModeSubmissionSerializer,
    AchievementSerializer, UserAchievementSerializer, userProblemSerializer
)

# Example View:
class HomePageView(APIView):
    def get(self, request):
        return Response({"message": "Welcome to Tensor Insight Training System!"})


# Authentication Views:
class SignUpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not (username and email and password):
            return JsonResponse({'error': 'Username, email, and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        django_user, created = CustomUser.objects.get_or_create(username=username, email=email)

        if created:
            django_user.set_password(password)
            django_user.save()

        return JsonResponse({'message': 'Sign up successful'}, status=status.HTTP_201_CREATED)

class SignInWithGoogleView(APIView):
    def post(self, request, *args, **kwargs):
        id_token = request.data.get('idToken')

        if not id_token:
            return JsonResponse({'error': 'ID token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token['uid']
            django_user, created = CustomUser.objects.get_or_create(username=uid)

            if created:
                # If the user is newly created, update additional user information
                email = decoded_token.get('email')
                if email:
                    django_user.email = email

                # Add any additional user information from the decoded token

                django_user.save()

            login(request, django_user)
            return JsonResponse({'message': 'Login successful'}, status=status.HTTP_200_OK)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
class SignInWithEmailPassView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        if not (username and password):
            return JsonResponse({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user:
            login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

class SignOutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)
        return JsonResponse({'message': 'Logout successful'}, status=status.HTTP_200_OK)

# Problem Set View:
class ProblemSetView(APIView):
    def get(self, request):
        problems = Problem.objects.all()
        serializer = ProblemSerializer(problems, many=True)
        return Response(serializer.data)

# Problem Detail View:
class ProblemDetailView(APIView):
    def get(self, request, problem_id):
        problem = Problem.objects.get(id=problem_id)
        serializer = ProblemSerializer(problem)
        return Response(serializer.data)

# Problem Submission View:
class ProblemSubmitView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, problem_id):
        # Implementation for submitting a problem solution
        pass

# Editorial List View:
class EditorialListView(APIView):
    def get(self, request, problem_id):
        editorials = Editorial.objects.filter(problem_id=problem_id)
        serializer = EditorialSerializer(editorials, many=True)
        return Response(serializer.data)

# Add Editorial View:
class AddEditorialView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, problem_id):
        # Implementation for adding an editorial
        pass

# Discussion List View:
class DiscussionListView(APIView):
    def get(self, request, problem_id):
        discussions = Discussion.objects.filter(problem_id=problem_id)
        serializer = DiscussionSerializer(discussions, many=True)
        return Response(serializer.data)

# Add Discussion View:
class AddDiscussionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, problem_id):
        # Implementation for adding a discussion
        pass

# Problem Submission List View:
class ProblemSubmissionListView(APIView):
    def get(self, request, problem_id):
        submissions = Submission.objects.filter(problem_id=problem_id)
        serializer = SubmissionSerializer(submissions, many=True)
        return Response(serializer.data)

# Submission Detail View:
class SubmissionDetailView(APIView):
    def get(self, request, submission_id):
        submission = Submission.objects.get(id=submission_id)
        serializer = SubmissionSerializer(submission)
        return Response(serializer.data)

# Editorial Detail View:
class EditorialDetailView(APIView):
    def get(self, request, editorial_id):
        editorial = Editorial.objects.get(id=editorial_id)
        serializer = EditorialSerializer(editorial)
        return Response(serializer.data)

# Add Editorial Comment View:
class AddEditorialCommentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, editorial_id):
        # Implementation for adding an editorial comment
        pass

# Upvote Discussion View:
class UpvoteDiscussionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, comment_id):
        # Implementation for upvoting a discussion comment
        pass

# Downvote Discussion View:
class DownvoteDiscussionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, comment_id):
        # Implementation for downvoting a discussion comment
        pass

# Upvote Editorial View:
class UpvoteEditorialView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, editorial_id):
        # Implementation for upvoting an editorial
        pass

# Downvote Editorial View:
class DownvoteEditorialView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, editorial_id):
        # Implementation for downvoting an editorial
        pass

# Upvote Editorial Comment View:
class UpvoteEditorialCommentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, comment_id):
        # Implementation for upvoting an editorial comment
        pass

# Downvote Editorial Comment View:
class DownvoteEditorialCommentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, comment_id):
        # Implementation for downvoting an editorial comment
        pass

# Contest View:
class ContestView(APIView):
    def get(self, request, contest_id):
        contest = Contest.objects.get(id=contest_id)
        serializer = ContestSerializer(contest)
        return Response(serializer.data)

# Contest Problem List View:
class ContestProblemListView(APIView):
    def get(self, request, contest_id):
        contest_problems = ContestProblem.objects.filter(contest_id=contest_id)
        serializer = ContestProblemSerializer(contest_problems, many=True)
        return Response(serializer.data)

# Contest Rank List View:
class ContestRankListView(APIView):
    def get(self, request, contest_id):
        # Implementation for retrieving contest rankings
        pass

# Quantity Mode View:
class QuantityModeView(APIView):
    def get(self, request):
        quantity_modes = QuantityMode.objects.all()
        serializer = QuantityModeSerializer(quantity_modes, many=True)
        return Response(serializer.data)

# Submit Quantity Mode View:
class QuantityModeSubmitView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Implementation for submitting a quantity mode solution
        pass

# Force End Quantity Mode View:
class QuantityModeForceEndView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Implementation for force ending a quantity mode challenge
        pass

# Time Mode View:
class TimeModeView(APIView):
    def get(self, request):
        time_modes = TimeMode.objects.all()
        serializer = TimeModeSerializer(time_modes, many=True)
        return Response(serializer.data)

# Submit Time Mode View:
class TimeModeSubmitView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Implementation for submitting a time mode solution
        pass

# Complete Time Mode View:
class TimeModeCompleteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Implementation for completing a time mode challenge
        pass

# Custom Mode View:
class CustomModeView(APIView):
    def get(self, request):
        custom_modes = CustomMode.objects.all()
        serializer = CustomModeSerializer(custom_modes, many=True)
        return Response(serializer.data)

# Submit Custom Mode View:
class CustomModeSubmitView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Implementation for submitting a custom mode solution
        pass

# Custom Mode Setting View:
class CustomModeSettingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Implementation for setting up a custom mode challenge
        pass

# Achievement List View:
class AchievementListView(APIView):
    def get(self, request):
        achievements = Achievement.objects.all()
        serializer = AchievementSerializer(achievements, many=True)
        return Response(serializer.data)

# User Detail View:
class UserDetailView(APIView):
    def get(self, request, user_id):
        user = CustomUser.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

# User Added Problem List View:
class UserProblemListView(APIView):
    def get(self, request, user_id):
        user_problems = UserProblem.objects.filter(user_id=user_id)
        serializer = userProblemSerializer(user_problems, many=True)
        return Response(serializer.data)

# User Contest List View:
class UserContestListView(APIView):
    def get(self, request, user_id):
        user_contests = ContestUser.objects.filter(user_id=user_id)
        serializer = ContestUserSerializer(user_contests, many=True)
        return Response(serializer.data)

# User Submission List View:
class UserSubmissionListView(APIView):
    def get(self, request, user_id):
        user_submissions = Submission.objects.filter(user_id=user_id)
        serializer = SubmissionSerializer(user_submissions, many=True)
        return Response(serializer.data)

# User Quantity Mode List View:
class UserQuantityModeListView(APIView):
    def get(self, request, user_id):
        user_quantity_modes = QuantityModeSubmission.objects.filter(user_id=user_id)
        serializer = QuantityModeSubmissionSerializer(user_quantity_modes, many=True)
        return Response(serializer.data)

# User Time Mode List View:
class UserTimeModeListView(APIView):
    def get(self, request, user_id):
        user_time_modes = TimeModeSubmission.objects.filter(user_id=user_id)
        serializer = TimeModeSubmissionSerializer(user_time_modes, many=True)
        return Response(serializer.data)

# User Custom Mode List View:
class UserCustomModeListView(APIView):
    def get(self, request, user_id):
        user_custom_modes = CustomModeSubmission.objects.filter(user_id=user_id)
        serializer = CustomModeSubmissionSerializer(user_custom_modes, many=True)
        return Response(serializer.data)

# User Achievement List View:
class UserAchievementListView(APIView):
    def get(self, request, user_id):
        user_achievements = UserAchievement.objects.filter(user_id=user_id)
        serializer = UserAchievementSerializer(user_achievements, many=True)
        return Response(serializer.data)



