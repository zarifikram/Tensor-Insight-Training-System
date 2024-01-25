from django.contrib import admin
from .models import (
    CustomUser,
    ProblemSetting,
    Problem,
    TestCase,
    Submission,
    Discussion,
    DiscussionVote,
    Editorial
)

# Register your models here.
admin.site.register(CustomUser)