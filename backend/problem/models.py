from django.db import models
from user_app.models import CustomUser

# Create your models here.
class Problem(models.Model):
    title = models.CharField(max_length=255,default="Untitled")
    description = models.TextField(default="No description")
    depth = models.IntegerField(null=True, blank=True)
    shape = models.JSONField(null=True, blank=True)
    difficulty = models.DecimalField(null=True, blank=True,max_digits=3, decimal_places=2)
    solve_count = models.IntegerField(default=0)
    try_count = models.IntegerField(default=0)
    show_code = models.BooleanField(default=False)
    addedAt = models.DateTimeField(auto_now_add=True)
    solution = models.TextField(null=True, blank=True)
    used_manipulator = models.JSONField(null=True, blank=True)
    editorial_image = models.ImageField(upload_to='editorial_images/',null=True)
    is_user_added = models.BooleanField(default=False)

#User Added Problem
class UserProblem(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)

class TestCase(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    input = models.JSONField(null=True, blank=True)
    output = models.JSONField(null=True, blank=True)
    test_case_no = models.IntegerField(null=True, blank=True)

class Submission(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    code = models.TextField()
    test_case_verdict = models.JSONField(null=True, blank=True)
    num_test_cases = models.IntegerField(default=5)
    num_test_cases_passed = models.IntegerField(default=0)
    taken_time = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)
    submission_no = models.IntegerField(default=1)

class Discussion(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    comment = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    parent_comment = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)

class DiscussionVote(models.Model):
    VOTE_NONE = 'none'
    VOTE_UP = 'up'
    VOTE_DOWN = 'down'

    VOTE_CHOICES = [
        (VOTE_NONE, 'none'),
        (VOTE_UP, 'up'),
        (VOTE_DOWN, 'down'),
    ]
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    vote = models.CharField(choices=VOTE_CHOICES,default=VOTE_NONE, max_length=10)
