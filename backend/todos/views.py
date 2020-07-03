from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
import uuid


class TodosView(APIView):
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
            ]
        )
