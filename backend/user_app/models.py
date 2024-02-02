from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    image = models.ImageField(upload_to='profile_images/',null=True, blank=True)
    level = models.IntegerField(default=0)
    xp = models.IntegerField(default=0)

    def __str__(self):
        return self.first_name+" "+self.last_name
    
#achievement
class Achievement(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    xp = models.IntegerField(default=0)
    image = models.ImageField(upload_to='achievement_images/',null=True, blank=True)

class UserAchievement(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

