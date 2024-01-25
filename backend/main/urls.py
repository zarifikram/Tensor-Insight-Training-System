from django.urls import path
from .views import (
    HomePageView,SignUpView, SignInWithGoogleView, SignInWithEmailPassView,SignOutView,ProblemSetView,
    ProblemDetailView,ProblemSubmissionListView,EditorialDetailView,
    AddEditorialView,AddDiscussionView,ProblemSubmitView,SubmissionDetailView,
    UserDetailView, UserAchievementListView,UserProblemListView,
    UserContestListView,UserSubmissionListView,UserQuantityModeListView,
    UserTimeModeListView,UserCustomModeListView,AchievementListView, 
    EditorialListView, DiscussionListView,AddEditorialCommentView,
    QuantityModeView,QuantityModeSubmitView,QuantityModeForceEndView,
    TimeModeView,TimeModeCompleteView, TimeModeSubmitView, CustomModeView,
    CustomModeSubmitView,CustomModeSettingView,
    ContestView, ContestProblemListView, ContestRankListView,
    UpvoteDiscussionView, DownvoteDiscussionView,
    UpvoteEditorialView, DownvoteEditorialView,
    UpvoteEditorialCommentView, DownvoteEditorialCommentView
)
urlpatterns = [
    # Home Page
    path('', HomePageView.as_view(), name='home_page'),

    # Authentication
    path('api/signup/', SignUpView.as_view(), name='signup'),
    path('api/signin-with-google/', SignInWithGoogleView.as_view(), name='signin_with_google'),
    path('api/signin-with-email-password/', SignInWithEmailPassView.as_view(), name='signin'),
    path('api/signout/', SignOutView.as_view(), name='signout'),

    # Problem Set
    path('api/problem-set/', ProblemSetView.as_view(), name='problem_set'),

    # Problem
    path('api/problem/<int:problem_id>/',ProblemDetailView.as_view(), name='problem_detail'),
    path('api/problem/<int:problem_id>/submit/', ProblemSubmitView.as_view(), name='submit_problem'),
    path('api/problem/<int:problem_id>/editorial-list/', EditorialListView.as_view(), name='editorial_list'),
    path('api/problem/<int:problem_id>/add-editorial/', AddEditorialView.as_view(), name='add_editorial'),
    path('api/problem/<int:problem_id>/discussion-list/', DiscussionListView.as_view(), name='discussion_list'),
    path('api/problem/<int:problem_id>/add-discussion/', AddDiscussionView.as_view(), name='add_discussion'),
    path('api/problem/<int:problem_id>/submission-list/', ProblemSubmissionListView.as_view(), name='submission_list'),
    path('api/submission/<int:submission_id>/', SubmissionDetailView.as_view(), name='submission_detail'),

    # Editorial
    path('api/editorial/<int:editorial_id>/', EditorialDetailView.as_view(), name='editorial_detail'),
    path('api/editorial/<int:editorial_id>/addcomment/', AddEditorialCommentView.as_view(), name='add_editorial_comment'),

    # Voting
    path('api/discussion/<int:comment_id>/upvote/', UpvoteDiscussionView.as_view(), name='upvote_discussion'),
    path('api/discussion/<int:comment_id>/downvote/', DownvoteDiscussionView.as_view(), name='downvote_discussion'),
    path('api/editorial/<int:editorial_id>/upvote/', UpvoteEditorialView.as_view(), name='upvote_editorial'),
    path('api/editorial/<int:editorial_id>/downvote/', DownvoteEditorialView.as_view(), name='downvote_editorial'),
    path('api/editorial/comment/<int:comment_id>/upvote/', UpvoteEditorialCommentView.as_view(), name='upvote_editorial_comment'),
    path('api/editorial/comment/<int:comment_id>/downvote/', DownvoteEditorialCommentView.as_view(), name='downvote_editorial_comment'),

    # Contest
    path('api/contest/<int:contest_id>/', ContestView.as_view(), name='contest_list'),
    path('api/contest/<int:contest_id>/problem-list/', ContestProblemListView.as_view(), name='contest_problem_list'),
    path('api/contest/<int:contest_id>/rank-list/', ContestRankListView.as_view(), name='contest_rank_list'),

    # Quantity Mode
    path('api/quantity-mode/', QuantityModeView.as_view(), name='quantity_mode'),
    path('api/quantity-mode/submit/', QuantityModeSubmitView.as_view(), name='submit_quantity_mode'),
    path('api/quantity-mode/force-end/', QuantityModeForceEndView.as_view(), name='force_end_quantity_mode'),

    # Time Mode
    path('api/time-mode/', TimeModeView.as_view(), name='time_mode'),
    path('api/time-mode/submit/', TimeModeSubmitView.as_view(), name='submit_time_mode'),
    path('api/time-mode/complete/', TimeModeCompleteView.as_view(), name='complete_time_mode'),

    # Custom Mode
    path('api/custom-mode/', CustomModeView.as_view(), name='custom_mode'),
    path('api/custom-mode/submit/', CustomModeSubmitView.as_view(), name='submit_custom_mode'),
    path('api/custom-mode/setting/', CustomModeSettingView.as_view(), name='setting_custom_mode'),

    # Achievement
    path('api/achievement/', AchievementListView.as_view(), name='achievement_list'),

    # User
    path('api/user/<int:user_id>/', UserDetailView.as_view(), name='user_detail'),
    path('api/user/<int:user_id>/problem-list/', UserProblemListView.as_view(), name='user_added_problem_list'),
    path('api/user/<int:user_id>/contest-list/', UserContestListView.as_view(), name='user_completed_contest_list'),
    path('api/user/<int:user_id>/submission/', UserSubmissionListView.as_view(), name='user_submission_list'),
    path('api/user/<int:user_id>/quantity-mode/', UserQuantityModeListView.as_view(), name='user_quantity_mode_list'),
    path('api/user/<int:user_id>/time-mode/', UserTimeModeListView.as_view(), name='user_time_mode_list'),
    path('api/user/<int:user_id>/custom-mode/', UserCustomModeListView.as_view(), name='user_custom_mode_list'),
    path('api/user/<int:user_id>/achievement/', UserAchievementListView.as_view(), name='user_achievement_list'),

]
