from django.urls import path
from .views import (
    AddDiscussionView, DiscussionView, DiscussionDetailsView, AddAnswerView, ReplyAnswerView,AcceptAnswerView, ResolvedView,
    EditDiscussionView, DeleteDiscussionView, EditAnswerView, DeleteAnswerView, EditReplyView, DeleteReplyView,
    UpvoteDiscussionView, DownvoteDiscussionView, UpvoteAnswerView, DownvoteAnswerView
)
urlpatterns = [
    # Discussion
    path('api/add-discussion/', AddDiscussionView.as_view(), name='add-discussion'),
    path('api/discussion-forum/', DiscussionView.as_view(), name='discussion_list'),
    path('api/discussion-forum/<int:pk>/', DiscussionDetailsView.as_view(), name='discussion_detail'),
    path('api/discussion-forum/<int:pk>/add-answer/', AddAnswerView.as_view(), name='add_answer'),
    path('api/answer/<int:aid>/reply/', ReplyAnswerView.as_view(), name='reply_answer'),

    path('api/discussion-forum/<int:pk>/edit/', EditDiscussionView.as_view(), name='edit_discussion'),
    path('api/discussion-forum/<int:pk>/delete/', DeleteDiscussionView.as_view(), name='delete_discussion'),
    path('api/answer/<int:aid>/edit/', EditAnswerView.as_view(), name='edit_answer'),
    path('api/answer/<int:aid>/delete/', DeleteAnswerView.as_view(), name='delete_answer'),
    path('api/reply/<int:rid>/edit/', EditReplyView.as_view(), name='edit_reply'),
    path('api/reply/<int:rid>/delete/', DeleteReplyView.as_view(), name='delete_reply'),

    path('api/discussion-forum/<int:pk>/upvote/', UpvoteDiscussionView.as_view(), name='upvote_discussion'),
    path('api/discussion-forum/<int:pk>/downvote/', DownvoteDiscussionView.as_view(), name='downvote_discussion'),
    path('api/answer/<int:aid>/upvote/', UpvoteAnswerView.as_view(), name='upvote_answer'),
    path('api/answer/<int:aid>/downvote/', DownvoteAnswerView.as_view(), name='downvote_answer'),

    path('api/discussion-forum/<int:fid>/answer/<int:aid>/accept/', AcceptAnswerView.as_view(), name='accept_answer'),
    path('api/discussion-forum/<int:pk>/resolved/', ResolvedView.as_view(), name='resolved_discussion'),
]
