from django.urls import path
from .views import (
    ContestProblemSubmissionView, CreateContestView, AddProblemToContestView, AddUserToContestView,ContestSubmissionListView,
    ContestView, ContestProblemListView, ContestRankListView, ContestListView,SearchContestView, ContestProblemView
)
urlpatterns = [
    # Contest
    path('api/contest-list/', ContestListView.as_view(), name='contest_list'),
    path('api/contest/<int:pk>/', ContestView.as_view(), name='contest_list'),
    path('api/contest/<int:pk>/submission-list/', ContestSubmissionListView.as_view(), name='contest_submission_list'),
    path('api/contest/<int:pk>/problem-list/', ContestProblemListView.as_view(), name='contest_problem_list'),
    path('api/contest/<int:cid>/problem/<int:pid>/', ContestProblemView.as_view(), name='contest_problem'),
    path('api/contest/<int:cid>/problem/<int:pid>/submit/', ContestProblemSubmissionView.as_view(), name='contest_problem_submit'),
    path('api/contest/<int:pk>/rank-list/', ContestRankListView.as_view(), name='contest_rank_list'),

    # Custom Contest
    path('api/create-contest/', CreateContestView.as_view(), name='create_contest'),
    path('api/contest/<int:pk>/add-problem/', AddProblemToContestView.as_view(), name='add_problem_to_contest'),
    path('api/contest/<int:pk>/add-user/', AddUserToContestView.as_view(), name='add_user_to_contest'),
    path('api/search-contest/', SearchContestView.as_view(), name='contest_search'),


]
