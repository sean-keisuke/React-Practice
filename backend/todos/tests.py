from rest_framework import status
from rest_framework.test import APITestCase
from uuid import UUID

class TodosTests(APITestCase):
    def test_get_todos(self):
        """
        Ensure we can get todos
        """
        response = self.client.get("/api/v1/todos", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        

        #print(response.data)
        #expectedData = {'todos': [{'id': UUID('2de4e8ac-4e48-4632-84ee-c7367eeb0b8e'), 'title': 'Take out the trash', 'completed': False}, {'id': UUID('1f591f5a-6f37-4a63-a488-ebdfb26f6510'), 'title': 'Take out the dishes', 'completed': False}, {'id': UUID('2cef5868-09fb-4f16-a1af-f357c1593515'), 'title': 'Take me out, trash', 'completed': False}]
        #self.assertEqual(response.data, expectedData)


        expectedTitle = response.data[0]['title']
        self.assertEqual('Take out the trash', expectedTitle)
        print(response.content)