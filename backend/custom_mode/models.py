from django.db import models
from problem.models import Problem, Submission
from user_app.models import CustomUser

# Create your models here.
class InitiatorChoice(models.Model):
    randint = models.BooleanField(default=True)
    zeros = models.BooleanField(default=True)
    ones = models.BooleanField(default=True)
    arange = models.BooleanField(default=True)
class ManipulatorChoice(models.Model):
    argwhere = models.BooleanField(default=True)
    tensor_split = models.BooleanField(default=True)
    gather = models.BooleanField(default=True)
    masked_select = models.BooleanField(default=True)
    movedim = models.BooleanField(default=True)
    splicing = models.BooleanField(default=True)
    t = models.BooleanField(default=True)
    take = models.BooleanField(default=True)
    tile = models.BooleanField(default=True)
    unsqueeze = models.BooleanField(default=True)
    negative = models.BooleanField(default=True)
    positive = models.BooleanField(default=True)
    where = models.BooleanField(default=True)
    remainder = models.BooleanField(default=True)
    clip = models.BooleanField(default=True)
    argmax = models.BooleanField(default=True)
    argmin = models.BooleanField(default=True)
    sum = models.BooleanField(default=True)
    unique = models.BooleanField(default=True)

#Custom Mode
class CustomMode(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    depth = models.IntegerField(default=2)
    initiator = models.ForeignKey(InitiatorChoice, on_delete=models.CASCADE, null=True, blank=True)
    manipulator = models.ForeignKey(ManipulatorChoice, on_delete=models.CASCADE, null=True, blank=True)
    current_problem = models.ForeignKey(Problem, on_delete=models.SET_NULL, null=True, blank=True)
    is_finished = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)


class CustomModeSubmission(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    custom_mode = models.ForeignKey(CustomMode, on_delete=models.CASCADE)