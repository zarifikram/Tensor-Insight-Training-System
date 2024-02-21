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
from contest.models import ContestUser, UserContest
from quantity_mode.models import QuantityModeSubmission
from time_mode.models import TimeModeSubmission
from custom_mode.models import CustomModeSubmission
from oneVone.models import OneVOne
import json



from .serializers import SignUpSerializer,LoginSerializer,UserSerializer, AchievementSerializer, UserAchievementSerializer, UserProblemSerializer,UserAddProblemSerializer,UserSubmissionListSerializer,EditProfileSerializer
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
    serializer_class = UserProblemSerializer
    def get(self, request, pk):
        user_problems = UserProblem.objects.filter(user_id=pk)
        serializer = UserProblemSerializer(user_problems, many=True)
        return Response(serializer.data)

# User Contest List View:
class UserContestListView(APIView):
    serializer_class = ContestListSerializer

    def get(self, request, pk):
        pk = self.kwargs['pk']
        user = CustomUser.objects.get(pk=pk)
        if user == None:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        contests = ContestUser.objects.filter(user=user).order_by('-contest__start_time')
        data = []
        for contest in contests:
            contest = contest.contest
            users_count = ContestUser.objects.filter(contest=contest).count()
            data.append({
                'id': contest.id,
                'title': contest.title,
                'users_count': users_count,
                'start_time': contest.start_time,
                'end_time': contest.end_time,
            })
        data2 = []
        contests = UserContest.objects.filter(user=user).order_by('-contest__start_time')
        for contest in contests:
            contest = contest.contest
            users_count = ContestUser.objects.filter(contest=contest).count()
            data2.append({
                'id': contest.id,
                'title': contest.title,
                'users_count': users_count,
                'start_time': contest.start_time,
                'end_time': contest.end_time,
            })
        return Response({"Created_contest":data2,"attended_contest":data}, status=status.HTTP_200_OK)

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
        problem = Problem.objects.create(is_user_added=True,show_code=True,used_manipulator=used_manipulator_instance, **validated_data)

        # Create TestCase instances
        for test_case_data in test_cases_data:
            TestCase.objects.create(problem=problem, **test_case_data)
        
        # Create UserProblem instance
        UserProblem.objects.create(user=user, problem=problem)

        return Response({'message': f'Problem "{problem.title}" added successfully.'}, status=status.HTTP_201_CREATED)
    
# {
#     "title": "test user Problem",
#     "description": "No description",
#     "depth": 2,
#     "used_manipulator": {"unique": true},
#        "test_cases": [
#         {
#             "input": "[[-6, -2], [6, 2]]",
#             "output": "[[-6, -2], [6, 2]]",
#             "test_case_no": 1
#         },
#         {
#             "input": "[[-10, -5], [-1, -8]]",
#             "output": "[[-10, -5], [-1, -8]]",
#             "test_case_no": 2
#         },
#         {
#             "input": "[[-2, -5], [-10, 1]]",
#             "output": "[[-5, -2], [1, -10]]",
#             "test_case_no": 3
#         },
#         {
#             "input": "[[9, 2], [9, 2]]",
#             "output": "[[2, 9]]",
#             "test_case_no": 4
#         },
#         {
#             "input": "[[-6, 8], [-5, -4]]",
#             "output": "[[-6, 8], [-5, -4]]",
#             "test_case_no": 5
#         }
#     ],
#     "solution": "o_tensor = torch.unique(tensor, dim=1)\ntensor = o_tensor\no_tensor = torch.unique(tensor, dim=0)\ntensor = o_tensor"
#   }


class GetCSRFtokenView(APIView):
    def get(self, request):
        if request.headers.get('cookie'):
            csrf_token = request.headers.get('cookie').split('csrftoken=')[1].split(';')[0]
            print(csrf_token)
            return Response({'csrftoken': csrf_token}, status=status.HTTP_200_OK)
        else:
            return Response({'csrftoken':None,'error': 'CSRF token not found'}, status=status.HTTP_404_NOT_FOUND)

class OneVOneListView(APIView):
    def get(self, request, pk):
        user = CustomUser.objects.get(id=pk)
        if user == None:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        one_v_one_list = OneVOne.objects.filter(primary_user=user)
        data = []
        for one_v_one in one_v_one_list:
            if one_v_one.secondary_user == None:
                opponent = {"status": "not joined"}
            else:
                opponent = {"id": one_v_one.secondary_user.id, "username": one_v_one.secondary_user.username}
            data.append({
                'id': one_v_one.id,
                'title': one_v_one.title,
                'description': one_v_one.description,
                'duration': one_v_one.duration,
                'num_of_problem': one_v_one.num_of_problem,
                'status': one_v_one.status,
                'opponent': opponent
            })
        one_v_one_list = OneVOne.objects.filter(secondary_user=user)
        data2 = []
        for one_v_one in one_v_one_list:
            data2.append({
                'id': one_v_one.id,
                'title': one_v_one.title,
                'description': one_v_one.description,
                'duration': one_v_one.duration,
                'num_of_problem': one_v_one.num_of_problem,
                'status': one_v_one.status,
                'opponent': {"id": one_v_one.primary_user.id, "username": one_v_one.primary_user.username}
            })
        return Response({"created":data,"invited":data2}, status=status.HTTP_200_OK)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({'error': 'You are not logged in'}, status=status.HTTP_401_UNAUTHORIZED)
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not old_password or not new_password or not confirm_password:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if not check_password(old_password, user.password):
            return Response({'error': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({'error': 'New password and confirm password do not match'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)

class EditProfileView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EditProfileSerializer
    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({'error': 'You are not logged in'}, status=status.HTTP_401_UNAUTHORIZED)
        user = request.user
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        image = request.data.get('image')
        username = request.data.get('username')

        if first_name:
            user.first_name = first_name

        if last_name:
            user.last_name = last_name

        if email:
            u = CustomUser.objects.filter(email=email)
            if u.exists() and u[0].id != user.id:
                return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
            user.email = email

        if image:
            user.image = image
        
        if username:
            u = CustomUser.objects.filter(username=username)
            if u.exists() and u[0].id != user.id:
                return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
            user.username = username

        user.save()
        return Response({'message': 'Profile updated successfully'}, status=status.HTTP_200_OK)