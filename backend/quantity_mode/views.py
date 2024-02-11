from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics
from problem.models import Submission, Problem
from utils.utils import generate_problem, xp_to_level
from math import log2
from django.db import models
from problem.serializers import ProblemSubmitSerializer, ModeProblemSerializer

from .models import QuantityMode
from .serializers import QuantityModeSerializer, QuantityModeCreateSerializer, QuantityModeLeaderboardSerializer
from utils.code_runner import evaluate_code
import json

# Create your views here.
class QuantityModeView(generics.RetrieveAPIView):
    serializer_class = QuantityModeSerializer
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            try:
                quantity_mode = QuantityMode.objects.get(user=request.user, is_finished=False)
                serializer = QuantityModeSerializer(quantity_mode)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except QuantityMode.DoesNotExist:
                return Response({'detail': 'Quantity mode not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            if request.session.get('quantity_mode')=='on':
                pid = request.session.get('quantity_mode_pid')
                current_problem_num = request.session.get('quantity_mode_current_problem_num')
                number_of_problems = request.session.get('quantity_mode_number_of_problems')
                problem = Problem.objects.get(pk=pid)
                serializer = ModeProblemSerializer(problem)
                return Response({'current_problem':serializer.data,'current_problem_num':current_problem_num,'number_of_problems':number_of_problems}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Quantity mode not found'}, status=status.HTTP_404_NOT_FOUND)
class QuantityModeCreateView(generics.CreateAPIView):
    serializer_class = QuantityModeCreateSerializer

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = request.user
            user.xp = user.xp + 5
            user.level = xp_to_level(user.xp)
            user.save()

            number_of_problems = int(request.data.get('number_of_problems'))

            # Check if there is an unfinished QuantityMode for the user
            unfinished_quantity_mode = QuantityMode.objects.filter(user=user, is_finished=False).first()

            if unfinished_quantity_mode:
                # Finish the active QuantityMode
                unfinished_quantity_mode.is_finished = True
                unfinished_quantity_mode.save()

            # Assign a current problem based on difficulty
            difficulty = 1 + (0.9 + log2(number_of_problems) * 0.5) * (log2(2) / log2(number_of_problems + 1))
            existing_problem = Problem.objects.filter(difficulty__range=(difficulty - 0.1, difficulty + 0.1)).exclude(submission__user=user).first()

            if existing_problem:
                # Use the existing problem
                quantity_mode = QuantityMode.objects.create(user=user, number_of_problems=number_of_problems,current_problem_num=1)
                quantity_mode.current_problem = existing_problem
                quantity_mode.save()
            else:
                # Create a new QuantityMode and generate a problem
                quantity_mode = QuantityMode.objects.create(user=user, number_of_problems=number_of_problems,current_problem_num=1)
                generated_problem = generate_problem(int(difficulty*0.5))
                quantity_mode.current_problem = generated_problem
                quantity_mode.save()

            return Response({'message': 'QuantityMode created successfully.'})
        else:
            number_of_problems = int(request.data.get('number_of_problems'))
            request.session['quantity_mode'] = 'on'
            request.session['quantity_mode_number_of_problems'] = number_of_problems
            request.session['quantity_mode_current_problem_num'] = 1
            difficulty = 1 + (0.9 + log2(number_of_problems) * 0.5) * (log2(2) / log2(number_of_problems + 1))
            if not request.session.get('problems_solved'):
                request.session['problems_solved'] = {}

            existing_problem = Problem.objects.filter(difficulty__range=(difficulty - 0.1, difficulty + 0.1)).exclude(pk__in=list(map(int, request.session.get('problems_solved', {}).keys()))).first()
            if existing_problem:
                request.session['quantity_mode_pid'] = existing_problem.id
            else:
                generated_problem = generate_problem(int(difficulty*0.5))
                request.session['quantity_mode_pid'] = generated_problem.id
            return Response({'message': 'QuantityMode created successfully.'})


# Submit Quantity Mode View:
class QuantityModeSubmitView(APIView):
    serializer_class = ProblemSubmitSerializer

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            serializer = ProblemSubmitSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            user = request.user
            code = serializer.validated_data['code']
            taken_time = serializer.validated_data['taken_time']

            # Get the active QuantityMode for the user
            quantity_mode = QuantityMode.objects.filter(user=user, is_finished=False).first()

            if quantity_mode:
                # Check if the current problem number is within the total number of problems
                problem = quantity_mode.current_problem

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
                    taken_time=taken_time
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

                # Update QuantityMode attributes
                quantity_mode.current_problem_num += 1
                quantity_mode.save()
                if quantity_mode.current_problem_num <= quantity_mode.number_of_problems:
                    difficulty = 1 + (0.9 + log2(quantity_mode.number_of_problems) * 0.5) * (log2(1+quantity_mode.current_problem_num) / log2(quantity_mode.number_of_problems + 1))
                    existing_problem = Problem.objects.filter(difficulty__range=(difficulty - 0.1, difficulty + 0.1)).exclude(submission__user=user).first()
                    if existing_problem:
                        quantity_mode.current_problem = existing_problem
                        quantity_mode.save()
                    else:
                        generated_problem = generate_problem(int(difficulty*0.5))
                        quantity_mode.current_problem = generated_problem
                        quantity_mode.save()

                    # Return the submission details
                    return Response(json.dumps(result), status=status.HTTP_201_CREATED)
                else:
                    quantity_mode.is_finished = True
                    quantity_mode.save()

                    user.xp = user.xp + quantity_mode.number_of_problems*2
                    user.level = xp_to_level(user.xp)
                    user.save()

                    return Response(json.dumps(result), status=status.HTTP_201_CREATED)

            return Response({'detail': 'QuantityMode not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            serializer = ProblemSubmitSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            problem = Problem.objects.get(pk=request.session['quantity_mode_pid'])
            code = request.data.get('code')

            problem_dict = ModeProblemSerializer(problem).data
            result = evaluate_code(code, problem_dict)
            num_test_cases=result['num_test_cases']
            num_test_cases_passed=result['num_test_cases_passed']

            accuracy = num_test_cases_passed/num_test_cases

            problems_solved = request.session.get('problems_solved', {})
            problems_solved[request.session['quantity_mode_pid']] = accuracy 
            request.session['problems_solved'] = problems_solved
            

            request.session['quantity_mode_current_problem_num'] += 1
            if request.session['quantity_mode_current_problem_num'] <= request.session['quantity_mode_number_of_problems']:
                difficulty = 1 + (0.9 + log2(request.session['quantity_mode_number_of_problems']) * 0.5) * (log2(1+request.session['quantity_mode_current_problem_num']) / log2(request.session['quantity_mode_number_of_problems'] + 1))
                existing_problem = Problem.objects.filter(difficulty__range=(difficulty - 0.1, difficulty + 0.1)).exclude(pk__in=list(map(int, request.session.get('problems_solved', {}).keys()))).first()
                if existing_problem:
                    request.session['quantity_mode_pid'] = existing_problem.id
                return Response(json.dumps(result), status=status.HTTP_201_CREATED)
            else:
                request.session['quantity_mode'] = 'off'
                return Response({'detail': 'QuantityMode has been completed.'}, status=status.HTTP_201_CREATED)
# Force End Quantity Mode View:
class QuantityModeForceEndView(APIView):

    def post(self, request):
        if request.user.is_authenticated:
            quantity_mode = QuantityMode.objects.filter(user=request.user, is_finished=False).first()
            if quantity_mode:
                quantity_mode.is_finished = True
                quantity_mode.save()
                return Response({'detail': 'QuantityMode has been completed.'}, status=status.HTTP_200_OK)
            return Response({'detail': 'QuantityMode not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            request.session['quantity_mode'] = 'off'
            return Response({'detail': 'QuantityMode has been completed.'}, status=status.HTTP_200_OK)
        
class QuantityModeLeaderBoardView(APIView):
    serializer_class = QuantityModeLeaderboardSerializer
    def get(self, request, *args, **kwargs):
        # Filter completed modes and order by the number_of_problems in descending order
        completed_modes = QuantityMode.objects.filter(current_problem_num=models.F('number_of_problems') + 1).order_by('-number_of_problems', 'timestamp')

        # Keep track of the best mode for each user
        best_modes = {}
        for mode in completed_modes:
            if mode.user.id not in best_modes or mode.number_of_problems > best_modes[mode.user.id].number_of_problems:
                best_modes[mode.user.id] = mode

        # Create a sorted leaderboard
        leaderboard = [
            QuantityModeLeaderboardSerializer(instance).data for id, instance in best_modes.items()
        ]

        return Response(leaderboard, status=status.HTTP_200_OK)
