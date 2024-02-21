from django.contrib import admin
from .models import DiscussionForum, DiscussionForumAnswer, DiscussionAnswerReply, DiscussionForumVote, DiscussionForumAnswerVote

# Register your models here.
admin.site.register(DiscussionForum)
admin.site.register(DiscussionForumAnswer)
admin.site.register(DiscussionAnswerReply)
admin.site.register(DiscussionForumVote)
admin.site.register(DiscussionForumAnswerVote)

