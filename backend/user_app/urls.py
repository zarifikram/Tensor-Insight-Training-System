from django.urls import path
from .views import (
    SignUpView, SignInWithGoogleView, SignInWithEmailPassView,SignOutView,
    UserAddProblemView,
    UserDetailView, UserAchievementListView,UserProblemListView,
    UserContestListView,UserSubmissionListView,UserQuantityModeListView,
    UserTimeModeListView,UserCustomModeListView,AchievementListView
)
urlpatterns = [
    # Authentication
    path('api/signup/', SignUpView.as_view(), name='signup'),
    path('api/signin-with-google/', SignInWithGoogleView.as_view(), name='signin_with_google'),
    path('api/signin-with-email-password/', SignInWithEmailPassView.as_view(), name='signin'),
    path('api/signout/', SignOutView.as_view(), name='signout'),

    # Achievement
    path('api/achievement/', AchievementListView.as_view(), name='achievement_list'),

    # User
    path('api/user/<int:pk>/', UserDetailView.as_view(), name='user_detail'),
    path('api/user/add-problem/', UserAddProblemView.as_view(), name='user_add_problem'),
    path('api/user/<int:pk>/problem-list/', UserProblemListView.as_view(), name='user_added_problem_list'),
    path('api/user/<int:pk>/contest-list/', UserContestListView.as_view(), name='user_completed_contest_list'),
    path('api/user/<int:pk>/submission/', UserSubmissionListView.as_view(), name='user_submission_list'),
    path('api/user/<int:user_id>/quantity-mode/', UserQuantityModeListView.as_view(), name='user_quantity_mode_list'),
    path('api/user/<int:user_id>/time-mode/', UserTimeModeListView.as_view(), name='user_time_mode_list'),
    path('api/user/<int:user_id>/custom-mode/', UserCustomModeListView.as_view(), name='user_custom_mode_list'),
    path('api/user/<int:user_id>/achievement/', UserAchievementListView.as_view(), name='user_achievement_list'),

]
