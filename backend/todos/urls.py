from django.urls import path

from . import views

urlpatterns = [
  path('todos', views.TodosView.as_view(), name='index'),
]