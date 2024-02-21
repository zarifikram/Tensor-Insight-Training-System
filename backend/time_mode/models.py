from django.db import models
from problem.models import Problem, Submission
from user_app.models import CustomUser

# Create your models here.
class TimeMode(models.Model):
    time_choice = [
        ('600', '600'),
        ('1800', '1800'),
        ('3600', '3600'),
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    time = models.CharField(max_length=10, choices=time_choice)
    current_problem_num = models.IntegerField(default=1)
    is_finished = models.BooleanField(default=False)
    current_problem = models.ForeignKey(Problem, on_delete=models.SET_NULL, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)


class TimeModeSubmission(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    time_mode = models.ForeignKey(TimeMode, on_delete=models.CASCADE)
    problem_number = models.IntegerField(default=1)
