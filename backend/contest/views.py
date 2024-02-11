from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics,status
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from problem.serializers import ProblemSubmitSerializer, ModeProblemSerializer
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
from problem.models import Submission, Problem, TestCase
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
        return Contest.objects.filter(pk=self.kwargs['pk'])
    
class ContestListView(generics.ListAPIView):
    serializer_class = ContestListSerializer

    def get_queryset(self):
        contests = Contest.objects.all()
        data = []
        for contest in contests:
            users_count = ContestUser.objects.filter(contest=contest).count()
            data.append({
                'id': contest.id,
                'title': contest.title,
                'users_count': users_count,
            })
        return data

class ContestProblemSubmissionView(generics.CreateAPIView):
    serializer_class = ProblemSubmitSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, cid, pid, *args, **kwargs):
        user = request.user
        contest_problem = ContestProblem.objects.get(contest__id=cid, problem__id=pid)
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
        
        contest_user, created = ContestUser.objects.get_or_create(user=user, contest=contest_problem.contest)

        # Check if the contest is still ongoing
        if self.is_contest_ongoing(contest_problem.contest):
            # Creating a ContestSubmission instance
            contest_submission = ContestSubmission.objects.create(
                submission=submission,
                contest_problem=contest_problem
            )

            return Response(json.dumps(result), status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "Contest time is over. Submissions are not allowed."}, status=status.HTTP_400_BAD_REQUEST)

    def is_contest_ongoing(self, contest):
        return contest.start_time <= timezone.now() <= contest.end_time

# Contest Problem List View:
class ContestProblemListView(APIView):
    serializer_class = ContestProblemSerializer
    def get(self, request, pk):
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
        title = request.data.get('title')
        start_time = request.data.get('start_time')
        end_time = request.data.get('end_time')
        c_id = request.data.get('c_id')
        password = request.data.get('password')
        num_random_problem = request.data.get('num_random_problem')

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
            password=password,
            num_random_problem=num_random_problem
        )

        add_contest_problems(contest,num_random_problem)

        return Response({"message": "Contest created successfully."}, status=status.HTTP_201_CREATED)

class AddProblemToContestView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AddProblemToContestSerializer
    def post(self, request, pk):
        contest = Contest.objects.get(pk=pk)
        if contest == None:
            return Response({"message": "Contest does not exist."}, status=status.HTTP_400_BAD_REQUEST)
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
            contest=contest,
            problem=problem,
            problem_number=problem_number
        )

        return Response({"message": "Problem added to contest successfully."}, status=status.HTTP_201_CREATED)

class AddUserToContestView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AddUserToContestSerializer
    def post(self, request, pk):
        contest = Contest.objects.get(pk=pk)
        user = request.user
        c_id = request.data.get('c_id')
        password = request.data.get('password')

        user_contest = UserContest.objects.get(contest=contest, c_id=c_id, password=password)
        if user_contest == None:
            return Response({"message": "Invalid contest id or password."}, status=status.HTTP_400_BAD_REQUEST)

        contest_user = ContestUser.objects.create(
            contest=contest,
            user=user
        )

        return Response({"message": "User added to contest successfully."}, status=status.HTTP_201_CREATED)
