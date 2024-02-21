from django.urls import path
from .views import (
    TimeModeView,TimeModeCompleteView, TimeModeSubmitView,TimeModeCreateView,
    TimeModeLeaderBoardView
)
urlpatterns = [

    # Time Mode
    path('api/time-mode/', TimeModeView.as_view(), name='time_mode'),
    path('api/time-mode/create/', TimeModeCreateView.as_view(), name='Time_mode_create'),
    path('api/time-mode/submit/', TimeModeSubmitView.as_view(), name='submit_time_mode'),
    path('api/time-mode/complete/', TimeModeCompleteView.as_view(), name='complete_time_mode'),
    path('api/time-mode/leaderboard/<str:time>/', TimeModeLeaderBoardView.as_view(), name='leaderboard_time_mode'),

]
