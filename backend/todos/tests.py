from rest_framework import status
from rest_framework.test import APITestCase
from uuid import UUID
from django.db import models
from todos.models import Todo

class TodosTests(APITestCase):
    def test_get_todos(self):
        """
        Ensure we can get todos
        """
        #adding todos
        todoTitles=["test1", "test2","test3","test4","test5"]
        for title in todoTitles:
            tempTodo = Todo.objects.create(title=title)   

        response = self.client.get("/api/v1/todos/", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        

        #print(response.data)
        #expectedData = {'todos': [{'id': UUID('2de4e8ac-4e48-4632-84ee-c7367eeb0b8e'), 'title': 'Take out the trash', 'completed': False}, {'id': UUID('1f591f5a-6f37-4a63-a488-ebdfb26f6510'), 'title': 'Take out the dishes', 'completed': False}, {'id': UUID('2cef5868-09fb-4f16-a1af-f357c1593515'), 'title': 'Take me out, trash', 'completed': False}]
        #self.assertEqual(response.data, expectedData)


        expectedTitle = response.data[0]['title']
        self.assertEqual('test1', expectedTitle)
        #print(response.data)
    
    def test_todo_model(self):
        """
        Test the database model
        """
        #adding todos
        todoTitles=["test1", "test2","test3","test4","test5"]
        for title in todoTitles:
            tempTodo = Todo.objects.create(title=title)   
        #print(Todo.objects.values_list('title'))
        #print('\n')

        #editing todos
        temp = Todo.objects.get(title="test3")
        temp.title = "Edit 1"
        temp.save()
        #print(Todo.objects.values_list('title'))
        #print('\n')

        #deleting todos
        temp = Todo.objects.get(title="test2")
        temp.delete()
        #print(Todo.objects.values_list('title'))
        #print('\n')
    
    def test_get_single_todo(self):
        Todo.objects.create(title="single todo", id=50) 
        id = 50

        response = self.client.get("/api/v1/todos/" + str(id) + "/", format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Todo.objects.count(), 1)
        self.assertEqual(Todo.objects.get().title, 'single todo')
        expected_title='single todo'
        self.assertEqual(expected_title, response.data["title"])

    def test_create_todos(self):
        url = "/api/v1/todos/"
        data = {'title': 'test_create_todos'}

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Todo.objects.count(), 1)
        self.assertEqual(Todo.objects.get().title, 'test_create_todos')
        self.assertEqual(Todo.objects.get().id, response.data['id'])
        expected_title='test_create_todos'
        self.assertEqual(expected_title, response.data["title"])


    def test_update_todos(self):
        Todo.objects.create(title="test", id=52) 
        id = 52
        data = {'title': 'test_update_todos', 'completed': 'true'}
        response = self.client.put("/api/v1/todos/" + str(id) + "/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Todo.objects.count(), 1)
        self.assertEqual(Todo.objects.get().title, 'test_update_todos')
        self.assertEqual(Todo.objects.get().id, response.data['id'])
        expected_title='test_update_todos'
        self.assertEqual(expected_title, response.data["title"])
        self.assertEqual(True, response.data["completed"])
        

    def test_delete_todos(self):
        Todo.objects.create(title="delete_todo", id=53) 
        id = 53

        response = self.client.delete("/api/v1/todos/" + str(id) + "/", format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Todo.objects.count(), 0)
        with self.assertRaises(Todo.DoesNotExist):
            Todo.objects.get().id
        