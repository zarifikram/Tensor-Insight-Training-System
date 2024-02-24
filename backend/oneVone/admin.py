from django.contrib import admin
from .models import OneVOne, OneVOneProblem, OneVOneSubmission, OneVOneNotification

# Register your models here.
admin.site.register(OneVOne)
admin.site.register(OneVOneProblem)
admin.site.register(OneVOneSubmission)
admin.site.register(OneVOneNotification)
