from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.http import JsonResponse
import uuid


def index(request):
    return JsonResponse(
        {
            "todos": [
                {"id": uuid.uuid4(), "title": "Take out the trash", "completed": False},
                {
                    "id": uuid.uuid4(),
                    "title": "Take out the dishes",
                    "completed": False,
                },
                {"id": uuid.uuid4(), "title": "Take me out, trash", "completed": False},
            ]
        }
    )
