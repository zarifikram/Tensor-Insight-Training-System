from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, uid, **extra_fields):
        user = self.model(username=uid, **extra_fields)
        user.save(using=self._db)
        return user

    def create_superuser(self, uid, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(uid, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(unique=True, max_length=150)

    name = models.CharField(max_length=150)
    xp = models.IntegerField(default=0)
    rating = models.IntegerField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username

class ProblemSetting(models.Model):
    generation_iteration = models.IntegerField(default=1)
    minimum_line = models.IntegerField(default=50)
    
class Problem(models.Model):
    title = models.CharField(max_length=255)
    problem_setting = models.ForeignKey(ProblemSetting, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField()
    difficulty = models.CharField(max_length=20)
    solve_count = models.IntegerField(default=0)
    try_count = models.IntegerField(default=0)
    show_code = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

class TestCase(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    input_data = models.JSONField()
    expected_output = models.JSONField()

class Submission(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    code = models.TextField()
    test_case_solved = models.IntegerField(default=0)
    test_case_failed = models.IntegerField(default=0)
    taken_time = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)

class Discussion(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    comment = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    parent_comment = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)

class DiscussionVote(models.Model):
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    upvote = models.BooleanField(default=False)
    downvote = models.BooleanField(default=False)

class Editorial(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class EditorialComment(models.Model):
    editorial = models.ForeignKey(Editorial, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    comment = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    parent_comment = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)

class EditorialCommentVote(models.Model):
    editorial_comment = models.ForeignKey(EditorialComment, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    upvote = models.BooleanField(default=False)
    downvote = models.BooleanField(default=False)

class EditorialVote(models.Model):
    editorial = models.ForeignKey(Editorial, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    upvote = models.BooleanField(default=False)
    downvote = models.BooleanField(default=False)

#Contest
class Contest(models.Model):
    title = models.CharField(max_length=255)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

class ContestProblem(models.Model):
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    problem_number = models.CharField(max_length=10)

class ContestSubmission(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)

class ContestUser(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)

#Quantity Mode
class QuantityMode(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    number_of_problems = models.IntegerField(default=0)
    current_problem_num = models.IntegerField(default=1)
    is_finished = models.BooleanField(default=False)
    current_problem = models.ForeignKey(Problem, on_delete=models.CASCADE, null=True, blank=True)

class QuantityModeSubmission(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    quantity_mode = models.ForeignKey(QuantityMode, on_delete=models.CASCADE)
    problem_number = models.IntegerField(default=0)

#Time Mode
class TimeMode(models.Model):
    time_choice = [
        ('300', '5min'),
        ('600', '10min'),
        ('1800', '30min'),
        ('3600', '1hour'),
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    time = models.CharField(max_length=255, choices=time_choice)
    current_problem_num = models.IntegerField(default=1)
    is_finished = models.BooleanField(default=False)
    current_problem = models.ForeignKey(Problem, on_delete=models.CASCADE, null=True, blank=True)

class TimeModeSubmission(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    time_mode = models.ForeignKey(TimeMode, on_delete=models.CASCADE)
    problem_number = models.IntegerField(default=0)

#Custom Mode
class CustomMode(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    problem_setting = models.ForeignKey(ProblemSetting, on_delete=models.CASCADE)
    current_problem = models.ForeignKey(Problem, on_delete=models.CASCADE, null=True, blank=True)
    current_problem_num = models.IntegerField(default=1)

class CustomModeSubmission(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    custom_mode = models.ForeignKey(CustomMode, on_delete=models.CASCADE)
    problem_number = models.IntegerField(default=0)

#achievement
class Achievement(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    xp = models.IntegerField(default=0)
    image = models.ImageField(upload_to='achievement_images/')

class UserAchievement(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

#User Added Problem
class UserProblem(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)



