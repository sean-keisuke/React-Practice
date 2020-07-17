from django.contrib import admin
from django.db import models
from todos.models import Todo, Project

# Register your models here.
admin.site.register(Todo)
admin.site.register(Project)

