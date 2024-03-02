from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics,status
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from problem.serializers import ProblemSubmitSerializer, ModeProblemSerializer, ProblemDetailsSerializer, ProblemSubmissionListSerializer
import json
from math import log2
from .serializers import (
    ContestSerializer,
    ContestListSerializer,
    ContestProblemSerializer,
    CreateContestSerializer,
    AddProblemToContestSerializer,
    AddUserToContestSerializer
)
from problem.models import Submission, Problem, TestCase, UserProblem
from .models import (
    Contest,
    ContestProblem,
    ContestUser,
    ContestSubmission,
    UserContest
)

from utils.utils import xp_to_level
from utils.code_runner import evaluate_code
from utils.tensor_generator import tensor_generator

def add_contest_problems(contest,num_of_problem):
    args = dict()
    args['chosen_initiator'] = ["randint", "zeros", "ones", "arange"]
    args['chosen_manipulator'] = [
            "argwhere",
            "tensor_split",
            "gather",
            "masked_select",
            "movedim",
            "splicing",
            "t",
            "take",
            "tile",
            "unsqueeze",
            "negative",
            "positive",
            "where",
            "remainder",
            "clip",
            "argmax",
            "argmin",
            "sum",
            "unique",
        ]
    args['how_many'] = 5
    for i in range(num_of_problem):
        args['depth'] = int(log2(i + 1)) + 1

        generated_problem = tensor_generator(args)

        depth=args['depth']
        difficulty = args['depth']*0.5+0.3*len(generated_problem['shape'])+0.2*max(generated_problem['shape']) 
        
        problem = Problem.objects.create(
            used_manipulator=json.dumps(list(generated_problem['manipulator_used'])),
            depth=depth,
            difficulty=difficulty,
            shape=json.dumps(generated_problem['shape']),
            solution = generated_problem['manipulation_code']
        )

        for j in range(args['how_many']):
            inp = generated_problem['input_tensors'][j].numpy()
            inp = json.dumps(inp.tolist())
            out = generated_problem['expected_tensors'][j].numpy()
            out = json.dumps(out.tolist())
            TestCase.objects.create(
                problem=problem,
                input=inp,
                output=out,
                test_case_no=j+1
            )
        
        ContestProblem.objects.create(contest=contest, problem=problem, problem_number=i+1)


# Create your views here.
# Contest View:
class ContestView(generics.RetrieveAPIView):
    serializer_class = ContestSerializer

    def get_queryset(self):
        contest = Contest.objects.filter(pk=self.kwargs['pk'])
        return contest
    
class ContestListView(generics.ListAPIView):
    serializer_class = ContestListSerializer

    def get_queryset(self):
        contests = Contest.objects.filter(is_user_added=False).order_by('-start_time')
        if len(contests) > 20:
            contests = contests[:20]
        data = []
        for contest in contests:
            users_count = ContestUser.objects.filter(contest=contest).count()
            data.append({
                'id': contest.id,
                'title': contest.title,
                'users_count': users_count,
                'is_user_added': contest.is_user_added,
                'start_time': contest.start_time,
                'end_time': contest.end_time
            })
        return data

# Contest Problem View:
class ContestProblemView(APIView):
    serializer_class = ProblemDetailsSerializer
    permission_classes = [IsAuthenticated]
    def get(self, request, cid, pid):
        problem = ContestProblem.objects.filter(contest__id=cid, problem__id=pid).first()
        if problem == None:
            return Response({"message": "Contest problem does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            problem = problem.problem
        serializer = ProblemDetailsSerializer(problem)
        if ContestUser.objects.filter(user=request.user, contest__id=cid).count() == 0:
            return Response({"message": "You are not a participant of this contest."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ContestProblemSubmissionView(generics.CreateAPIView):
    serializer_class = ProblemSubmitSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, cid, pid, *args, **kwargs):
        user = request.user
        if Contest.objects.filter(id=cid).first().start_time > timezone.now():
            return Response({"message": "Contest has not started yet."}, status=status.HTTP_400_BAD_REQUEST)
        elif Contest.objects.filter(id=cid).first().end_time < timezone.now():
            return Response({"message": "Contest has ended."}, status=status.HTTP_400_BAD_REQUEST)
        
        if ContestUser.objects.filter(user=user, contest__id=cid).count() == 0:
            return Response({"message": "You are not a participant of this contest."}, status=status.HTTP_400_BAD_REQUEST)
        
        contest_problem = ContestProblem.objects.filter(contest__id=cid, problem__id=pid).first()
        if contest_problem == None:
            return Response({"message": "Contest problem does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        problem = contest_problem.problem
        code = request.data.get('code')
        taken_time = request.data.get('taken_time')

        # Check if a submission for the user and problem exists
        existing_submissions = Submission.objects.filter(
            user=user,
            problem=contest_problem.problem
        ).order_by('-submission_no')

        if existing_submissions.exists():
            submission_no = existing_submissions.first().submission_no + 1
        else:
            submission_no = 1

        problem_dict = ModeProblemSerializer(problem).data
        result = evaluate_code(code, problem_dict)
        if result['status'] == 'error':
            return Response(json.dumps(result),status=status.HTTP_400_BAD_REQUEST)
        num_test_cases=result['num_test_cases']
        num_test_cases_passed=result['num_test_cases_passed']

        submission = Submission.objects.create(
            user=user,
            problem=problem,
            code=code,
            test_case_verdict=result['result'],
            num_test_cases=result['num_test_cases'],
            num_test_cases_passed=result['num_test_cases_passed'],
            taken_time=taken_time,
            submission_no=submission_no
        )
        accuracy = num_test_cases_passed/num_test_cases
        user.xp = user.xp + float(problem.difficulty)*0.6 + accuracy*5.0
        user.level = xp_to_level(user.xp)
        user.save()

        if accuracy == 1:
            problem.solve_count += 1
            problem.try_count += 1
            problem.save()
        else:
            problem.try_count += 1
            problem.save()

        contest_submission = ContestSubmission.objects.create(
                submission=submission,
                contest_problem=contest_problem
            )
        return Response(json.dumps(result), status=status.HTTP_201_CREATED)

# Contest Problem List View:
class ContestProblemListView(APIView):
    serializer_class = ContestProblemSerializer
    def get(self, request, pk):
        contest = Contest.objects.filter(id=pk).first()
        if contest == None:
            return Response({"message": "Contest does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        elif contest.start_time > timezone.now():
            return Response({"message": "Contest has not started yet."}, status=status.HTTP_400_BAD_REQUEST)
        contest_problems = ContestProblem.objects.filter(contest_id=pk)
        serializer = ContestProblemSerializer(contest_problems, many=True)
        return Response(serializer.data)

# Contest Rank List View:
class ContestRankListView(APIView):
    def get(self, request, pk):
        # Retrieve all users for the specified contest
        contest_users = ContestUser.objects.filter(contest_id=pk).order_by('id')

        # Retrieve all problems for the specified contest
        contest_problems = ContestProblem.objects.filter(contest_id=pk).order_by('problem_number')
        num_problems = contest_problems.count()

        # Initialize the 2D list for the leaderboard
        leaderboard = []

        for contest_user in contest_users:
            user_row = {
                'user_id': contest_user.user.id,
                'username': contest_user.user.username,
                'submissions': [],
            }

            for contest_problem in contest_problems:
                submission_info = self.get_submission_info(contest_user.user, contest_problem)
                user_row['submissions'].append(submission_info)

            leaderboard.append(user_row)
        
        # Sort the leaderboard based on the number of problems solved, last submission time, and the number of attempts
        sorted_leaderboard = sorted(leaderboard, key=lambda x: (
                                    sum(submission['isSolved'] for submission in x['submissions']),  # Sorting key 1
                                    -max((submission['lastSubmissionTime'] for submission in x['submissions'] if submission['lastSubmissionTime'] is not None), default=0),  # Sorting key 2 with default value
                                    sum(submission['attempted'] for submission in x['submissions'])  # Sorting key 3
                                    ), reverse=True)

        

        return Response(sorted_leaderboard, status=status.HTTP_200_OK)

    def get_submission_info(self, user, contest_problem):
        # Get all submissions for the user and problem
        submissions = ContestSubmission.objects.filter(
            submission__user=user,
            contest_problem=contest_problem
        ).order_by('submission__timestamp')

        # Check if there are any submissions
        if submissions.exists():
            # Calculate submission info
            num_attempts = submissions.count()
            is_solved = submissions.last().submission.num_test_cases == submissions.last().submission.num_test_cases_passed

            submission_info = {
                'isSolved': is_solved,
                'attempted': num_attempts,
                'lastSubmissionTime': (submissions.last().submission.timestamp - contest_problem.contest.start_time).total_seconds(),
            }
        else:
            # No submissions for this user and problem
            submission_info = {
                'isSolved': False,
                'attempted': 0,
                'lastSubmissionTime': None,
            }

        return submission_info

# Custom Contest Views:
class CreateContestView(generics.CreateAPIView):
    serializer_class = CreateContestSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serialized_data = CreateContestSerializer(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        serialized_data = serialized_data.validated_data
        print(serialized_data)

        contest_data = serialized_data.get('contest', {})
        title = contest_data.get('title')
        start_time = contest_data.get('start_time')
        end_time = contest_data.get('end_time')
        c_id = serialized_data.get('c_id')
        passkey = serialized_data.get('passkey')
        num_random_problem = serialized_data.get('num_random_problem')

        print(title, start_time, end_time, c_id, passkey, num_random_problem)

        contest = Contest.objects.create(
            title=title,
            start_time=start_time,
            end_time=end_time,
            is_user_added=True
        )

        user_contest = UserContest.objects.create(
            user=request.user,
            contest=contest,
            c_id=c_id,
            passkey=passkey,
            num_random_problem=num_random_problem
        )

        add_contest_problems(contest,num_random_problem)

        request.user.xp = request.user.xp + 50
        request.user.level = xp_to_level(request.user.xp)
        request.user.save()

        return Response({"message": "Contest created successfully."}, status=status.HTTP_201_CREATED)

class AddProblemToContestView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AddProblemToContestSerializer
    def post(self, request, pk):
        contest = Contest.objects.get(pk=pk)
        if contest == None:
            return Response({"message": "Contest does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        
        if contest.start_time < timezone.now():
            if contest.end_time < timezone.now():
                return Response({"message": "Contest has ended."}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"message": "Contest has already started."}, status=status.HTTP_400_BAD_REQUEST)
        
        if contest.is_user_added == False:
            return Response({"message": "This contest is not a custom contest."}, status=status.HTTP_400_BAD_REQUEST)
        contest = UserContest.objects.get(user=request.user, contest=contest)
        if contest == None:
            return Response({"message": "You are not the creator of this contest."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = AddProblemToContestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Create the Problem instance and associated objects
        validated_data = serializer.validated_data.pop('problem')
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

        problem_number = serializer.validated_data.pop('problem_number')

        contest_problem = ContestProblem.objects.create(
            contest=contest.contest,
            problem=problem,
            problem_number=problem_number
        )

        # create user problem
        user_problem = UserProblem.objects.create(user=request.user, problem=problem)

        request.user.xp = request.user.xp + 10
        request.user.level = xp_to_level(request.user.xp)
        request.user.save()

        return Response({"message": "Problem added to contest successfully."}, status=status.HTTP_201_CREATED)
    
# {
#   "problem": {
#     "title": "test contest Problem",
#     "description": "No description",
#     "depth": 1,
#     "used_manipulator": {"where": true},
#        "test_cases": [
#         {
#             "input": "[0]",
#             "output": "[-1]",
#             "test_case_no": 1
#         },
#         {
#             "input": "[1]",
#             "output": "[-1]",
#             "test_case_no": 2
#         },
#         {
#             "input": "[0]",
#             "output": "[-1]",
#             "test_case_no": 3
#         },
#         {
#             "input": "[-3]",
#             "output": "[-1]",
#             "test_case_no": 4
#         },
#         {
#             "input": "[7]",
#             "output": "[-1]",
#             "test_case_no": 5
#         }
#     ],
#     "solution": "o_tensor = torch.where(tensor == 2, 100, -1)\ntensor = o_tensor"
#   },
#   "problem_number": 6
# }

class AddUserToContestView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AddUserToContestSerializer
    def post(self, request, pk):
        contest = Contest.objects.get(pk=pk)
        user = request.user

        if contest.end_time < timezone.now():
            return Response({"message": "Contest has ended."}, status=status.HTTP_400_BAD_REQUEST)

        if contest.is_user_added == True:
            c_id = request.data.get('c_id')
            passkey = request.data.get('passkey')

            user_contest = UserContest.objects.get(contest=contest, c_id=c_id, passkey=passkey)
            if user_contest == None:
                return Response({"message": "Invalid contest id or passkey."}, status=status.HTTP_400_BAD_REQUEST)
            
        contest_user = ContestUser.objects.get_or_create(
            contest=contest,
            user=user
        )
        user.xp = user.xp + 20
        user.level = xp_to_level(user.xp)
        user.save()
        return Response({"message": "User added to contest successfully."}, status=status.HTTP_201_CREATED)
    
class SearchContestView(APIView):
    def get(self, request):
        c_id = request.query_params.get('cid')
        if c_id == None:
            return Response({"message": "Search keyword required."}, status=status.HTTP_400_BAD_REQUEST)
        contest = UserContest.objects.filter(c_id=c_id).first()
        if contest == None:
            contest = Contest.objects.filter(title__icontains=c_id).first()
            if contest == None:
                return Response({"message": "Contest does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            contest = contest.contest
        
        users_count = ContestUser.objects.filter(contest=contest).count()
        data = { 'id': contest.id, 'title': contest.title, 'users_count': users_count, 'start_time':contest.start_time, 'end_time':contest.end_time, 'is_user_added': contest.is_user_added }
        return Response(data, status=status.HTTP_200_OK)
    
class ContestSubmissionListView(APIView):
    serializer_class = ProblemSubmissionListSerializer

    def get(self, request, pk):
        contest = Contest.objects.filter(id=pk).first()
        if contest == None:
            return Response({"message": "Contest does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        elif contest.start_time > timezone.now():
            return Response({"message": "Contest has not started yet."}, status=status.HTTP_400_BAD_REQUEST)
        contest_submissions = ContestSubmission.objects.filter(contest_problem__contest_id=pk).order_by('-submission__timestamp')
        data = []
        for contest_submission in contest_submissions:
            submission = contest_submission.submission
            data.append({
                'id': submission.id,
                'user': {'id': submission.user.id, 'username': submission.user.username},
                'problem': contest_submission.contest_problem.problem.title,
                'code': submission.code,
                'test_case_verdict': submission.test_case_verdict,
                'num_test_cases': submission.num_test_cases,
                'num_test_cases_passed': submission.num_test_cases_passed,
                'taken_time': submission.taken_time,
                'timestamp': submission.timestamp
            })
        return Response(data, status=status.HTTP_200_OK)
