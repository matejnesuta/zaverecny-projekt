from django.contrib import admin
from .models import *
# Register your models here.

models = [Profile, Taskboard, Membership, Task, Attachment, Log, Comment]

admin.site.register(models)
