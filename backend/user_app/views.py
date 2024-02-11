from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics
from utils.utils import xp_to_level
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from firebase_admin import  auth
from django.contrib.auth import login, logout
from django.contrib.auth.hashers import check_password
from .models import  CustomUser, Achievement, UserAchievement
from problem.models import Submission, UserProblem, Problem, TestCase
from contest.models import ContestUser, Contest
from quantity_mode.models import QuantityModeSubmission
from time_mode.models import TimeModeSubmission
from custom_mode.models import CustomModeSubmission
import json



from .serializers import SignUpSerializer,LoginSerializer,UserSerializer, AchievementSerializer, UserAchievementSerializer, userProblemSerializer,UserAddProblemSerializer,UserSubmissionListSerializer
from problem.serializers import ProblemSetSerializer
from contest.serializers import ContestListSerializer

# Create your views here.
# Authentication Views:
class SignUpView(generics.CreateAPIView):
    serializer_class = SignUpSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"user_id": user.id, "message": "User created successfully"}, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        user = serializer.save()
        return user

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
class SignInWithEmailPassView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            user = CustomUser.objects.filter(username=username).first()
            if user is not None and check_password(password, user.password):
                # Password matches, log in the user
                login(request, user)
                user.xp = user.xp + 10
                user.level = xp_to_level(user.xp)
                user.save()
                id = user.id
                return Response({'user': serializer.data,'id':id}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SignOutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)
        return JsonResponse({'message': 'Logout successful'}, status=status.HTTP_200_OK)

# Achievement List View:
class AchievementListView(APIView):
    serializer_class = AchievementSerializer
    def get(self, request):
        achievements = Achievement.objects.all()
        serializer = AchievementSerializer(achievements, many=True)
        return Response(serializer.data)

# User Detail View:
class UserDetailView(APIView):
    serializer_class = UserSerializer
    def get(self, request, pk):
        user = CustomUser.objects.get(id=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

# User Added Problem List View:
class UserProblemListView(APIView):
    serializer_class = ProblemSetSerializer
    def get(self, request, user_id):
        user_problems = UserProblem.objects.filter(user_id=user_id)
        serializer = userProblemSerializer(user_problems, many=True)
        return Response(serializer.data)

# User Contest List View:
class UserContestListView(generics.ListAPIView):
    serializer_class = ContestListSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        user = CustomUser.objects.get(pk=pk)
        contests = Contest.objects.all(user=user)
        data = []
        for contest in contests:
            users_count = ContestUser.objects.filter(contest=contest).count()
            data.append({
                'id': contest.id,
                'title': contest.title,
                'users_count': users_count,
            })
        return data

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class({'completed_contests': queryset})
        return Response(serializer.data)

# User Submission List View:
class UserSubmissionListView(generics.ListAPIView):
    queryset = Submission.objects.all()
    serializer_class = UserSubmissionListSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Submission.objects.filter(user__id=pk)

# User Quantity Mode List View:
class UserQuantityModeListView(APIView):
    serializer_class = UserSubmissionListSerializer
    def get(self, request, user_id):
        user_quantity_modes = QuantityModeSubmission.objects.filter(user_id=user_id)
        serializer = UserSubmissionListSerializer(user_quantity_modes.submission, many=True)
        return Response(serializer.data)

# User Time Mode List View:
class UserTimeModeListView(APIView):
    serializer_class = UserSubmissionListSerializer
    def get(self, request, user_id):
        user_time_modes = TimeModeSubmission.objects.filter(user_id=user_id)
        serializer = UserSubmissionListSerializer(user_time_modes.submission, many=True)
        return Response(serializer.data)

# User Custom Mode List View:
class UserCustomModeListView(APIView):
    serializer_class = UserSubmissionListSerializer
    def get(self, request, user_id):
        user_custom_modes = CustomModeSubmission.objects.filter(user_id=user_id)
        serializer = UserSubmissionListSerializer(user_custom_modes.submission, many=True)
        return Response(serializer.data)

# User Achievement List View:
class UserAchievementListView(APIView):
    serializer_class = UserAchievementSerializer
    def get(self, request, user_id):
        user_achievements = UserAchievement.objects.filter(user_id=user_id)
        serializer = UserAchievementSerializer(user_achievements, many=True)
        return Response(serializer.data)

class UserAddProblemView(APIView):
    serializer_class = UserAddProblemSerializer
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):

        user = request.user
        serializer = UserAddProblemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Create the Problem instance and associated objects
        validated_data = serializer.validated_data
        used_manipulator_data = validated_data.pop('used_manipulator')
        true_manipulator_items = [key for key, value in used_manipulator_data.items() if value]
        print(validated_data)
        print(true_manipulator_items )
        test_cases_data = validated_data.pop('testcase_set',{})
        print(test_cases_data)
        # Create ManipulatorChoice instance
        used_manipulator_instance = json.dumps(true_manipulator_items)
        # Create Problem instance
        problem = Problem.objects.create(is_user_added=True,used_manipulator=used_manipulator_instance, **validated_data)

        # Create TestCase instances
        for test_case_data in test_cases_data:
            TestCase.objects.create(problem=problem, **test_case_data)

        return Response({'message': f'Problem "{problem.title}" added successfully.'}, status=status.HTTP_201_CREATED)
