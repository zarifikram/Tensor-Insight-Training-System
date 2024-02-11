from django.urls import path
from .views import (
    QuantityModeCreateView,
    QuantityModeView,QuantityModeSubmitView,QuantityModeForceEndView,
    QuantityModeLeaderBoardView
)
urlpatterns = [

    # Quantity Mode
    path('api/quantity-mode/', QuantityModeView.as_view(), name='quantity_mode'),
    path('api/quantity-mode/create/', QuantityModeCreateView.as_view(), name='quantity_mode_create'),
    path('api/quantity-mode/submit/', QuantityModeSubmitView.as_view(), name='submit_quantity_mode'),
    path('api/quantity-mode/force-end/', QuantityModeForceEndView.as_view(), name='force_end_quantity_mode'),
    path('api/quantity-mode/leaderboard/', QuantityModeLeaderBoardView.as_view(), name='leaderboard_quantity_mode'),

]
