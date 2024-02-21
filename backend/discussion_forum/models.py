from django.db import models
from user_app.models import CustomUser

# Create your models here.
class DiscussionForum(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_resolved = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    def __str__(self):
        return self.title

class DiscussionForumAnswer(models.Model):
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_accepted = models.BooleanField(default=False)
    discussion_forum = models.ForeignKey(DiscussionForum, on_delete=models.CASCADE)
    def __str__(self):
        return self.answer

class DiscussionAnswerReply(models.Model):
    reply = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    discussion_forum_answer = models.ForeignKey(DiscussionForumAnswer, on_delete=models.CASCADE)
    def __str__(self):
        return self.reply
class DiscussionForumVote(models.Model):
    VOTE_NONE = 'none'
    VOTE_UP = 'up'
    VOTE_DOWN = 'down'

    VOTE_CHOICES = [
        (VOTE_NONE, 'none'),
        (VOTE_UP, 'up'),
        (VOTE_DOWN, 'down'),
    ]
    discussion = models.ForeignKey(DiscussionForum, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    vote = models.CharField(choices=VOTE_CHOICES,default=VOTE_NONE, max_length=10)

class DiscussionForumAnswerVote(models.Model):
    VOTE_NONE = 'none'
    VOTE_UP = 'up'
    VOTE_DOWN = 'down'

    VOTE_CHOICES = [
        (VOTE_NONE, 'none'),
        (VOTE_UP, 'up'),
        (VOTE_DOWN, 'down'),
    ]
    discussion = models.ForeignKey(DiscussionForumAnswer, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    vote = models.CharField(choices=VOTE_CHOICES,default=VOTE_NONE, max_length=10)
