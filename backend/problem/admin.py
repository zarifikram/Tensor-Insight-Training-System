from django.contrib import admin
from .models import Problem, Submission, TestCase, Discussion, DiscussionVote, UserProblem, SavedProblem

# Register your models here.
admin.site.register(Problem)
admin.site.register(Submission)
admin.site.register(TestCase)
admin.site.register(Discussion)
admin.site.register(DiscussionVote)
admin.site.register(UserProblem)
admin.site.register(SavedProblem)