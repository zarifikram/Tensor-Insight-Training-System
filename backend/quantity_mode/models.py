from django.db import models
from problem.models import Problem, Submission
from user_app.models import CustomUser

# Create your models here.
class QuantityMode(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    number_of_problems = models.IntegerField(default=0)
    current_problem_num = models.IntegerField(default=1)
    is_finished = models.BooleanField(default=False)
    current_problem = models.ForeignKey(Problem, on_delete=models.SET_NULL, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

class QuantityModeSubmission(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    quantity_mode = models.ForeignKey(QuantityMode, on_delete=models.CASCADE)
    problem_number = models.IntegerField(default=1)
