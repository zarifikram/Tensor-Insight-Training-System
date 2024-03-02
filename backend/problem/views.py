from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics
from utils.utils import xp_to_level
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from .models import Problem, Submission, Discussion, DiscussionVote,SavedProblem
from .serializers import ProblemSetSerializer, ProblemDetailsSerializer, ProblemSubmitSerializer, ProblemSubmissionListSerializer, SubmissionSerializer, DiscussionSerializer, AddDiscussionSerializer, DiscussionVoteSerializer, ModeProblemSerializer, RunProblemSerializer
from utils.code_runner import evaluate_code
import json

class ProblemSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000

# Create your views here.
class HomePageView(APIView):
    def get(self, request):
        return Response({"message": "Welcome to Tensor Insight Training System!"})
    
# Problem Set View:
class ProblemSetView(generics.ListAPIView):
    serializer_class = ProblemSetSerializer
    pagination_class = ProblemSetPagination

    def get_queryset(self):
        queryset = Problem.objects.filter(show_code=True).order_by('-addedAt')

        # Get query parameters
        difficulty__gte = self.request.query_params.get('difficulty__gte')
        difficulty__lte = self.request.query_params.get('difficulty__lte')
        depth__gte = self.request.query_params.get('depth__gte')
        depth__lte = self.request.query_params.get('depth__lte')
        is_user_added = self.request.query_params.get('is_user_added')

        # Check if the query parameter exists and filter accordingly
        if difficulty__gte:
            queryset = queryset.filter(difficulty__gte=float(difficulty__gte))
        if difficulty__lte:
            queryset = queryset.filter(difficulty__lte=float(difficulty__lte))
        if depth__gte:
            queryset = queryset.filter(depth__gte=int(depth__gte))
        if depth__lte:
            queryset = queryset.filter(depth__lte=int(depth__lte))
        if is_user_added:
            queryset = queryset.filter(is_user_added=is_user_added.lower() == 'true')

        # Check for each manipulator and filter if it's true
        manipulators = [
            "argwhere", "tensor_split", "gather", "masked_select",
            "movedim", "splicing", "t", "take", "tile", "unsqueeze",
            "negative", "positive", "where", "remainder", "clip",
            "argmax", "argmin", "sum", "unique"
        ]

        used_manip = []
        for manipulator in manipulators:
            manipulator_value = self.request.query_params.get(manipulator)
            if manipulator_value and manipulator_value.lower() == 'true':
                used_manip.append(manipulator)
        
        filtered_queryset = []
        for problem in queryset:
            used_manipulator = problem.used_manipulator
            if all(manipulator in used_manipulator for manipulator in used_manip):
                filtered_queryset.append(problem)

        return filtered_queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class RunProblemView(APIView):
    serializer_class = RunProblemSerializer
    def post(self, request):
        print(request.data)
        test_cases = request.data.get('test_cases')
        code = request.data.get('code')
        result = evaluate_code(str(code), request.data)
        return Response(result, status=status.HTTP_200_OK)


# Problem Detail View:
class ProblemDetailView(generics.RetrieveAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemDetailsSerializer

    def retrieve(self, request, *args, **kwargs):
        problem = self.get_object()
        serializer = self.get_serializer(problem)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Problem Submission View:
class ProblemSubmitView(generics.CreateAPIView): 
    queryset = Submission.objects.all()
    serializer_class = ProblemSubmitSerializer

    def create(self, request, pk, *args, **kwargs):

        problem = Problem.objects.get(pk=pk)
        if problem == None:
            return Response({'detail': 'Problem not found.'}, status=status.HTTP_404_NOT_FOUND)
        if problem.show_code == False:
            return Response({'detail': 'You are not allowed to submit.'}, status=status.HTTP_403_FORBIDDEN)
        code = request.data.get('code')
        taken_time = request.data.get('taken_time')

        problem_dict = ModeProblemSerializer(problem).data
        result = evaluate_code(code, problem_dict)

        if result['status'] == 'error':
            return Response(json.dumps(result),status=status.HTTP_400_BAD_REQUEST)
        
        num_test_cases=result['num_test_cases']
        num_test_cases_passed=result['num_test_cases_passed']
        accuracy = num_test_cases_passed/num_test_cases

        if accuracy == 1:
            problem.solve_count += 1
            problem.try_count += 1
            problem.save()
        else:
            problem.try_count += 1
            problem.save()

        if request.user.is_authenticated:
            user = request.user
            # Check if a submission for the user and problem exists
            existing_submissions = Submission.objects.filter(
                user=user,
                problem=problem
            ).order_by('-submission_no')

            if existing_submissions.exists():
                submission_no = existing_submissions.first().submission_no + 1
            else:
                submission_no = 1

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

            user.xp = user.xp + float(problem.difficulty)*0.6 + accuracy*5.0
            user.level = xp_to_level(user.xp)
            user.save()

            return Response(json.dumps(result),status=status.HTTP_201_CREATED)
        else:
            if not request.session.get('problems_solved'):
                request.session['problems_solved'] = {}

            problems_solved = request.session.get('problems_solved', {})
            problems_solved[str(pk)] = accuracy
            request.session['problems_solved'] = problems_solved
            return Response(json.dumps(result),status=status.HTTP_201_CREATED)

# Problem Submission List View:
class ProblemSubmissionListView(generics.ListAPIView):
    serializer_class = ProblemSubmissionListSerializer

    def get_queryset(self):
        problem_id = self.kwargs['pk']
        return Submission.objects.filter(problem__id=problem_id).order_by('-timestamp')
    
    def get(self, request, *args, **kwargs):
        problem_id = self.kwargs['pk']
        problem = Problem.objects.get(pk=problem_id)
        if problem == None:
            return Response({'detail': 'Problem not found.'}, status=status.HTTP_404_NOT_FOUND)
        if problem.show_code == False:
            return Response({'detail': 'You are not allowed to view submissions.'}, status=status.HTTP_403_FORBIDDEN)
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Submission Detail View:
class SubmissionDetailView(generics.RetrieveAPIView):
    queryset = Submission.objects.filter(problem__show_code=True).order_by('-timestamp')
    serializer_class = SubmissionSerializer
    
# Discussion List View:
class DiscussionListView(generics.ListAPIView):
    serializer_class = DiscussionSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context

    def get_queryset(self):
        problem_id = self.kwargs['pk']
        return Discussion.objects.filter(problem_id=problem_id, parent_comment__isnull=True, problem__show_code=True).order_by('-timestamp')

# Add Discussion View:
class AddDiscussionView(generics.CreateAPIView):
    queryset = Discussion.objects.all()
    serializer_class = AddDiscussionSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, pk, *args, **kwargs):
        user = request.user
        problem = Problem.objects.get(pk=pk)
        if problem == None:
            return Response({'detail': 'Problem not found.'}, status=status.HTTP_404_NOT_FOUND)
        if problem.show_code == False:
            return Response({'detail': 'You are not allowed to add discussion.'}, status=status.HTTP_403_FORBIDDEN)
        
        comment = request.data.get('comment')

        discussion = Discussion.objects.create(
            user=user,
            problem=problem,
            comment=comment
        )

        user.xp = user.xp + 10
        user.level = xp_to_level(user.xp)
        user.save()

        serializer = AddDiscussionSerializer(discussion)
        return Response(serializer.data)

class ReplyDiscussionView(generics.CreateAPIView):
    queryset = Discussion.objects.all()
    serializer_class = AddDiscussionSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, pk, *args, **kwargs):
        user = request.user
        parent_discussion = Discussion.objects.get(pk=pk)
        comment = request.data.get('comment')

        discussion = Discussion.objects.create(
            user=user,
            problem=parent_discussion.problem,
            comment=comment,
            parent_comment=parent_discussion
        )

        user.xp = user.xp + 5
        user.level = xp_to_level(user.xp)
        user.save()

        serializer = AddDiscussionSerializer(discussion)
        return Response(serializer.data)
    
class EditDiscussionView(generics.UpdateAPIView):
    queryset = Discussion.objects.all()
    serializer_class = AddDiscussionSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, pk, *args, **kwargs):
        discussion = self.get_object()
        if request.user == discussion.user:
            serializer = AddDiscussionSerializer(discussion, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': 'You do not have permission to edit this discussion.'}, status=status.HTTP_403_FORBIDDEN)

class DeleteDiscussionView(generics.DestroyAPIView):
    queryset = Discussion.objects.all()
    serializer_class = AddDiscussionSerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, pk, *args, **kwargs):
        discussion = self.get_object()
        if request.user == discussion.user:
            discussion.delete()
            return Response({'detail': 'Discussion deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'detail': 'You do not have permission to delete this discussion.'}, status=status.HTTP_403_FORBIDDEN)
    
class UpvoteDiscussionView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, pk):
        user = request.user
        user.xp = user.xp + 1
        user.level = xp_to_level(user.xp)
        user.save()
        try:
            discussion_vote = DiscussionVote.objects.get(discussion_id=pk, user=request.user.id)
            if discussion_vote.vote == DiscussionVote.VOTE_UP:
                # Case 2: User previously upvoted, delete the vote
                discussion_vote.delete()
                return Response({'detail': 'Upvote removed successfully.'}, status=status.HTTP_200_OK)
            elif discussion_vote.vote == DiscussionVote.VOTE_DOWN:
                # Case 3: User previously downvoted, change the vote to upvote
                discussion_vote.vote = DiscussionVote.VOTE_UP
                discussion_vote.save()
                serializer = DiscussionVoteSerializer(discussion_vote)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except DiscussionVote.DoesNotExist:
            # Case 1: User has not voted before, add a new upvote
            serializer = DiscussionVoteSerializer(data={'discussion': pk, 'user': request.user.id, 'vote': DiscussionVote.VOTE_UP})
            user.xp = user.xp + 3
            user.level = xp_to_level(user.xp)
            user.save()
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DownvoteDiscussionView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, pk):

        user = request.user
        user.xp = user.xp + 1
        user.level = xp_to_level(user.xp)
        user.save()

        try:
            discussion_vote = DiscussionVote.objects.get(discussion_id=pk, user=request.user.id)
            if discussion_vote.vote == DiscussionVote.VOTE_DOWN:
                # Case 2: User previously downvoted, delete the vote
                discussion_vote.delete()
                return Response({'detail': 'Downvote removed successfully.'}, status=status.HTTP_200_OK)
            elif discussion_vote.vote == DiscussionVote.VOTE_UP:
                # Case 3: User previously upvoted, change the vote to downvote
                discussion_vote.vote = DiscussionVote.VOTE_DOWN
                discussion_vote.save()
                serializer = DiscussionVoteSerializer(discussion_vote)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except DiscussionVote.DoesNotExist:
            # Case 1: User has not voted before, add a new downvote
            serializer = DiscussionVoteSerializer(data={'discussion': pk, 'user': request.user.id, 'vote': DiscussionVote.VOTE_DOWN})
            user.xp = user.xp + 3
            user.level = xp_to_level(user.xp)
            user.save()
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#for online
class ProblemSaveView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request,pk):
        user = request.user
        problem = Problem.objects.get(pk=pk)
        if problem == None:
            return Response({'detail': 'Problem not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        saved_problem, created = SavedProblem.objects.get_or_create(user=user, problem=problem)

        if not created:
            # If the SavedProblem already exists, delete it
            saved_problem.delete()
            return Response({'detail': 'Problem unsaved successfully.'}, status=status.HTTP_201_CREATED)

        return Response({'detail': 'Problem saved successfully.'}, status=status.HTTP_201_CREATED)
