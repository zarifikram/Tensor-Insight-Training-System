from django.db import models
from django.utils import timezone
from problem.models import Problem, Submission
from user_app.models import CustomUser

# Create your models here.
class Contest(models.Model):
    title = models.CharField(max_length=15, default=timezone.now().strftime("%Y-%m-%d"))
    start_time = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField(default=(timezone.now() + timezone.timedelta(hours=24)))
    is_user_added = models.BooleanField(default=False)
    def __str__(self):
        return self.title

class UserContest(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)
    c_id = models.CharField(max_length=50, unique=True, null=True, blank=True)
    password = models.CharField(max_length=15, null=True, blank=True)
    num_random_problem = models.IntegerField(default=0)


class ContestProblem(models.Model):
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    problem_number = models.IntegerField()

class ContestSubmission(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    contest_problem = models.ForeignKey(ContestProblem, on_delete=models.CASCADE)

class ContestUser(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)
    position = models.IntegerField(null=True, blank=True)
