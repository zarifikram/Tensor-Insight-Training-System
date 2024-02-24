from django.urls import path
from .views import (
    CreateView,JoinView, StatusView, OneVOneView,ProblemSubmitView, LeftView
)
urlpatterns = [
    path('api/1-v-1/', OneVOneView.as_view(), name='one_v_one'),
    path('api/1-v-1/create/', CreateView.as_view(), name='one_v_one_create'),
    path('api/1-v-1/join/', JoinView.as_view(), name='one_v_one_join'),
    path('api/1-v-1/status/', StatusView.as_view(), name='one_v_one_status'),
    path('api/1-v-1/problem/<int:pid>/submit/', ProblemSubmitView.as_view(), name='one_v_one_problem_submit'),
    path('api/1-v-1/left/', LeftView.as_view(), name='one_v_one_left'),
]
