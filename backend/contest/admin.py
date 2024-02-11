from django.contrib import admin
from .models import Contest, ContestProblem, ContestUser, ContestSubmission

# Register your models here.
admin.site.register(Contest)
admin.site.register(ContestProblem)
admin.site.register(ContestUser)
admin.site.register(ContestSubmission)