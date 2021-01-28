from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

mongo_uri = 'mongodb://127.0.0.1:27017'
db = MongoClient(mongo_uri)['test_db']
collection = db['todos']
class TodoListView(APIView):

    def get(self, request):
        # Implement this method - return all todo items from db instance above.
        todos = []
        for docs in collection.find():
            todos.append(docs['todo'])
        return Response({'result':todos}, status=status.HTTP_200_OK)
        
    def post(self, request):
        # Implement this method - accept a todo item in a mongo collection, persist it using db instance above.
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        todoLiist = {
            'todo':data['todo']
        }
        collection.insert(todoLiist)
        return Response({'result':'sucessfull'}, status=status.HTTP_200_OK)

