from django.urls import path
from .views import (
    CustomModeView,
    CustomModeSubmitView,CustomModeSettingView, CustomModeLeaderBoardView
)
urlpatterns = [

    # Custom Mode
    path('api/custom-mode/', CustomModeView.as_view(), name='custom_mode'),
    path('api/custom-mode/submit/', CustomModeSubmitView.as_view(), name='submit_custom_mode'),
    path('api/custom-mode/setting/', CustomModeSettingView.as_view(), name='setting_custom_mode'),
    path('api/custom-mode/leaderboard/', CustomModeLeaderBoardView.as_view(), name='leaderboard_custom_mode'),

]
