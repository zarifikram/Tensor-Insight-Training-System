from django.urls import path
from .views import (
    ProblemSetView, HomePageView,
    ProblemDetailView,ProblemSubmissionListView,
    AddDiscussionView,ProblemSubmitView,SubmissionDetailView,
    DiscussionListView, RunProblemView,
    UpvoteDiscussionView, DownvoteDiscussionView,ReplyDiscussionView, EditDiscussionView, DeleteDiscussionView
)
urlpatterns = [

    # Home
    path('', HomePageView.as_view(), name='home'),
    # Problem Set
    path('api/problem-set/', ProblemSetView.as_view(), name='problem_set'),
    path('api/run-problem/', RunProblemView.as_view(), name='run_problem'),

    # Problem
    path('api/problem/<int:pk>/',ProblemDetailView.as_view(), name='problem_detail'),
    path('api/problem/<int:pk>/submit/', ProblemSubmitView.as_view(), name='submit_problem'),
    path('api/problem/<int:pk>/submission-list/', ProblemSubmissionListView.as_view(), name='submission_list'),
    path('api/submission/<int:pk>/', SubmissionDetailView.as_view(), name='submission_detail'),

    # Discussion
    path('api/problem/<int:pk>/discussion-list/', DiscussionListView.as_view(), name='discussion_list'),
    path('api/problem/<int:pk>/add-discussion/', AddDiscussionView.as_view(), name='add_discussion'),
    path('api/discussion/<int:pk>/edit/', EditDiscussionView.as_view(), name='edit_discussion'),
    path('api/discussion/<int:pk>/delete/', DeleteDiscussionView.as_view(), name='delete_discussion'),
    path('api/discussion/<int:pk>/reply/', ReplyDiscussionView.as_view(), name='reply_discussion'),
    path('api/discussion/<int:pk>/upvote/', UpvoteDiscussionView.as_view(), name='upvote_discussion'),
    path('api/discussion/<int:pk>/downvote/', DownvoteDiscussionView.as_view(), name='downvote_discussion'),

]
