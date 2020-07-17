from django.urls import path, include
from rest_framework.routers import DefaultRouter
from todos import views


# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'todos', views.TodosView, basename='Todos')
router.register(r'users', views.UserViewSet)
router.register(r'projects', views.ProjectView, basename='Projects')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]

"""
urlpatterns = [
  path('todos', views.TodosView.as_view(), name='index'),
]
"""