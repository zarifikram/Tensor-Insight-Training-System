from django.db import models
from django.utils import timezone
from problem.models import Problem, Submission
from user_app.models import CustomUser

class OneVOne(models.Model):
    CREATED = 'created'
    STARTED = 'started'
    ENDED = 'ended'

    STATUS_CHOICES = [
        (CREATED, 'created'),
        (STARTED, 'started'),
        (ENDED, 'ended'),
    ]
    WAITING = 'waiting'
    JOINED = 'joined'
    LEFT = 'left'
    USER_STATUS = [
        (WAITING, 'waiting'),
        (JOINED, 'joined'),
        (LEFT, 'left'),
    ]
    title = models.CharField(max_length=150, default="untitled")
    description = models.TextField(default="no description")
    duration = models.IntegerField(default=600)
    num_of_problem = models.IntegerField(default=5)
    key = models.CharField(max_length=50, unique=True)
    primary_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='primary_user')
    secondary_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null = True, blank = True, related_name='secondary_user')
    status = models.CharField(choices=STATUS_CHOICES,default=CREATED, max_length=10)
    created_at = models.DateTimeField(default=timezone.now)
    started_at = models.DateTimeField(null=True, blank=True)
    primary_user_status = models.CharField(choices=USER_STATUS,default=JOINED, max_length=10)
    primary_user_score = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    secondary_user_score = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    secondary_user_status = models.CharField(choices=USER_STATUS,default=WAITING, max_length=10)
    def __str__(self):
        return self.title

class OneVOneProblem(models.Model):
    oneVone = models.ForeignKey(OneVOne,  on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    problem_number = models.IntegerField(default=1)

class OneVOneSubmission(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    oneVone_problem = models.ForeignKey(OneVOneProblem, on_delete=models.CASCADE)

class OneVOneNotification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.CharField(max_length=200, default="")
    timestamp = models.DateTimeField(default=timezone.now)
    is_read = models.BooleanField(default=False)
    def __str__(self):
        return self.message