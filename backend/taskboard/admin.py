from django.contrib import admin
from .models import *
# Register your models here.

models = [Profile, Taskboard, Membership, Task, Attachment]

admin.site.register(models)
