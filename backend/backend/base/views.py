from django.shortcuts import render
from django.contrib.auth.models import User



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated



from . models import Application
import json
# Create your views here.

class Signup(APIView):
    def post(self, request):
        body     = request.body.decode('utf-8')
        body     = json.loads(body)
        username = body['username']
        email    = body['email']
        password = body['password']
        if User.objects.filter(email=email).exists():
            return Response(400)
        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
        except Exception as e:
            print(e)
        return Response(200)

class RegisterApplication(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        post = {
            'username' : "",
            'address'  : "",
            'city'     : "",
            'state'    : "",
            'phone'    : "",
            'email'    : "",
            'company_name': "",
        }
        return Response(post)

        def post(self, request):
            body = request.body.decode('utf-8')
            body = json.loads(body)
            body = body['data']
            print(body)


class CheckApplication(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user 
        if Application.objects.filter(user = user).exists():
            return Response(200)
        return Response(200)