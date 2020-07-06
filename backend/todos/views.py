from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets, renderers, permissions
from rest_framework.decorators import action
from todos.serializers import TodoSerializer, UserSerializer
from todos.models import Todo
import uuid

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Todo.objects.all()
    serializer_class = UserSerializer()

class TodosView(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset  = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
    def highlight(self, request, *args, **kwargs):
        snippet = self.get_object()
        return Response(snippet.highlighted)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)






"""
class TodosViewOld(APIView):
    # renderer_classes

    def get(self, request, format=None):
        return Response(
            [
                {
                    "id": uuid.uuid4(), 
                    "title": "Take out the trash", 
                    "completed": False
                },
                {
                    "id": uuid.uuid4(),
                    "title": "Take out the dishes",
                    "completed": False,
                },
                {
                    "id": uuid.uuid4(), 
                    "title": "Take me out, trash", 
                    "completed": False
                },
                {
                    "id": uuid.uuid4(), 
                    "title": "Take the trash out again",
                    "completed": False
                },
            ]
        )
"""