from django.contrib import admin
from .models import CustomUser, Achievement, UserAchievement

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Achievement)
admin.site.register(UserAchievement)
