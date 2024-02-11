from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import models
from rest_framework import status
from .models import CustomMode, CustomModeSubmission, InitiatorChoice, ManipulatorChoice
from problem.models import Submission
from user_app.models import CustomUser
from utils.utils import generate_problem, generate_custom_problem, ci, cm, xp_to_level

from problem.serializers import ProblemSubmitSerializer, ModeProblemSerializer
from .serializers import CustomModeSettingSerializer, CustomModeLeaderboardSerializer
from utils.code_runner import evaluate_code
import json
# Create your views here.
class CustomModeView(APIView):
    serializer_class = ModeProblemSerializer

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = request.user

            # Check if there is an existing CustomMode for the user
            custom_mode = CustomMode.objects.filter(user=user, is_finished=False).first()

            if not custom_mode:
                # If no CustomMode, create a default one
                initiator_choice, _ = InitiatorChoice.objects.get_or_create(ones=True, zeros=True, randint=True, arange=True)
                manipulator_choice, _ = ManipulatorChoice.objects.get_or_create(argwhere=True, tensor_split=True, gather=True,
                                                                                masked_select=True, movedim=True, splicing=True, t=True,
                                                                                take=True, tile=True, unsqueeze=True, positive=True,
                                                                                negative=True, where=True, remainder=True, clip=True,
                                                                                argmax=True, argmin=True, sum=True, unique=True)

                custom_mode = CustomMode.objects.create(user=user, initiator=initiator_choice, manipulator=manipulator_choice)

            # Generate a problem using custom mode settings if current problem is null
            if custom_mode.current_problem is None:
                serializer = CustomModeSettingSerializer(custom_mode)
                print(serializer.data)
                depth = serializer.data['depth']
                initiator = serializer.data.get('initiator', {})
                manipulator = serializer.data.get('manipulator', {})
                # Get a list of items where the value is True for initiator
                true_initiator_items = [key for key, value in initiator.items() if value]
                # Get a list of items where the value is True for manipulator
                true_manipulator_items = [key for key, value in manipulator.items() if value]
                generated_problem = generate_problem(depth, true_initiator_items,true_manipulator_items)
                custom_mode.current_problem = generated_problem
                custom_mode.save()

            # Serialize the current problem
            serializer = ModeProblemSerializer(custom_mode.current_problem)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            if request.session.get('custom_mode')=='on':
                depth = request.session.get('depth')
                initiator = request.session.get('chosen_initiator')
                manipulator = request.session.get('chosen_manipulator')

                used_manipulator,test_cases = generate_custom_problem(depth,initiator,manipulator)
                # serializer = ModeProblemSerializer(data={'test_cases':test_cases,'used_manipulator':used_manipulator})
                # serializer.is_valid(raise_exception=True)

                # return Response(serializer.validated_data, status=status.HTTP_200_OK)
                return Response({'test_cases':test_cases,'used_manipulator':used_manipulator}, status=status.HTTP_200_OK)

            else:
                request.session['custom_mode'] = 'on'
                request.session['chosen_initiator'] = ci
                request.session['chosen_manipulator'] = cm
                request.session['depth'] = 2

                print(request.session)

                used_manipulator,test_cases = generate_custom_problem(2)
                # serializer = ModeProblemSerializer(data={'test_cases':test_cases,'used_manipulator':used_manipulator})
                # serializer.is_valid(raise_exception=True)
                
                # return Response(serializer.validated_data, status=status.HTTP_200_OK)
                return Response({'test_cases':test_cases,'used_manipulator':used_manipulator}, status=status.HTTP_200_OK)
# Submit Custom Mode View:
class CustomModeSubmitView(APIView):
    serializer_class = ProblemSubmitSerializer

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            serializer = ProblemSubmitSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            user = request.user
            code = serializer.validated_data['code']
            taken_time = serializer.validated_data['taken_time']

            # Get the active Custom Mode for the user
            custom_mode = CustomMode.objects.filter(user=user, is_finished=False).first()

            if custom_mode:
                problem = custom_mode.current_problem

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

                CustomModeSubmission.objects.create(
                    submission=submission,
                    custom_mode=custom_mode
                )
                custom_mode.current_problem = None
                custom_mode.save()
                # Return the submission details
                return Response(json.dumps(result), status=status.HTTP_201_CREATED)

            return Response({'detail': 'CustomMode not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            #have to run code
            return Response({'detail': 'Submission is not allowed for anonymous user.'}, status=status.HTTP_201_CREATED)

# Custom Mode Setting View:
class CustomModeSettingView(APIView):
    serializer_class = CustomModeSettingSerializer

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            
            user = request.user
            serializer = CustomModeSettingSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            depth = serializer.validated_data['depth']
            initiator = serializer.validated_data.get('initiator', {})
            manipulator = serializer.validated_data.get('manipulator', {})
            
            # Check if there is an unfinished CustomMode for the user
            unfinished_custom_mode = CustomMode.objects.filter(user=user, is_finished=False).first()

            if unfinished_custom_mode:
                # Finish the active CustomMode
                unfinished_custom_mode.is_finished = True
                unfinished_custom_mode.save()

            # Create or retrieve the CustomMode instance
            initiator_instance, _ = InitiatorChoice.objects.get_or_create(**initiator)
            manipulator_instance, _ = ManipulatorChoice.objects.get_or_create(**manipulator)

            custom_mode, created = CustomMode.objects.get_or_create(
                user=user,
                initiator=initiator_instance,
                manipulator=manipulator_instance,
                depth=depth
            )
            custom_mode.is_finished = False
            custom_mode.save()        
            serializer = CustomModeSettingSerializer(custom_mode)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            serializer = CustomModeSettingSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            depth = serializer.validated_data['depth']
            initiator = serializer.validated_data.get('initiator', {})
            manipulator = serializer.validated_data.get('manipulator', {})
            # Get a list of items where the value is True for initiator
            true_initiator_items = [key for key, value in initiator.items() if value]
            # Get a list of items where the value is True for manipulator
            true_manipulator_items = [key for key, value in manipulator.items() if value]
            
            request.session['custom_mode'] = 'on'
            request.session['chosen_initiator'] = true_initiator_items
            request.session['chosen_manipulator'] = true_manipulator_items
            request.session['depth'] = int(depth)

            return Response({'message': 'Custom mode settings stored successfully.'})
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = request.user
            custom_mode = CustomMode.objects.filter(user=user, is_finished=False).first()
            if custom_mode:
                serializer = CustomModeSettingSerializer(custom_mode)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                manipolator,_ = ManipulatorChoice.objects.get_or_create(argwhere=True,tensor_split=True, gather=True,masked_select=True,movedim=True,splicing=True,t=True,take=True,tile=True,unsqueeze=True,positive=True,negative=True,where=True,
                                                                          remainder=True,clip=True,argmax=True,argmin=True,sum=True,unique=True)
                initiator,_ = InitiatorChoice.objects.get_or_create(ones=True, zeros=True,randint=True, arange=True)
                custom_mode,create = CustomMode.objects.get_or_create(user=user, initiator=initiator, manipulator=manipolator)
                if not create:
                    custom_mode.is_finished = False
                    custom_mode.save()
                serializer = CustomModeSettingSerializer(custom_mode)
                return Response(serializer.data, status=status.HTTP_200_OK)     
        else:
            if request.session.get('custom_mode')=='on':
                depth = request.session.get('depth')
                initiator_dict = {item: False for item in ci} 
                manipulator_dict = {item: False for item in cm}
                initiator_dict.update({item: True for item in request.session['chosen_initiator']})
                manipulator_dict.update({item: True for item in request.session['chosen_manipulator']})
                serializer = CustomModeSettingSerializer(data={'depth': depth, 'initiator': initiator_dict, 'manipulator': manipulator_dict})
                serializer.is_valid(raise_exception=True)
                return Response(serializer.validated_data, status=status.HTTP_200_OK)
            else:
                request.session['custom_mode'] = 'on'
                request.session['chosen_initiator'] = ci
                request.session['chosen_manipulator'] = cm
                request.session['depth'] = 2

                depth = 2
                initiator_dict = {item: True for item in ci}
                manipulator_dict = {item: True for item in cm}

                serializer = CustomModeSettingSerializer(data={'depth': depth, 'initiator': initiator_dict, 'manipulator': manipulator_dict})
                serializer.is_valid(raise_exception=True)
                return Response(serializer.validated_data, status=status.HTTP_200_OK)
            
class CustomModeLeaderBoardView(APIView):
    serializer_class = CustomModeLeaderboardSerializer
    def get(self, request, *args, **kwargs):
        # Filter CustomUser instances with related CustomModeSubmission
        users_with_submissions = CustomUser.objects.filter(custommode__custommodesubmission__isnull=False).distinct()
        
        # Annotate the count of solved problems
        users_ranked = users_with_submissions.annotate(solved_problems=models.Count('custommode__custommodesubmission')).order_by('-solved_problems')

        # Serialize the queryset
        serializer = CustomModeLeaderboardSerializer(users_ranked, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)