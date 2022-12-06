from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Q



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status



from . serializers import ApplicationSerializer
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
        body         = request.body.decode('utf-8')
        body         = json.loads(body)
        body         = body['data']
        user         = request.user 
        username     = body['user']
        address      = body['address']
        city         = body['city']
        state        = body['state']
        phone        = body['phone']
        email        = body['email']
        company_name = body['company_name']
        applications = Application.objects.create(
            address  = address,city         = city,
            state    = state,  email        = email,
            phone    = phone,  company_name = company_name
        ) 
        print(applications)
        applications.save
        return Response(200)


class CheckApplication(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user 
        if Application.objects.filter(user = user).exists():
            return Response(200)
        if Application.objects.filter(Q(user = user) & Q(denied = True)):
            return Response(200)
        if Application.objects.filter(Q(user = user) & Q(applied= True) & Q(allotted = True)).exists():
            return Response(403)
        if Application.objects.filter(Q(user = user) & Q(applied = True) & Q(Approved = True)).exists():
            return Response(403)
        return Response(200)



class UserApplications(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        applications = Application.objects.filter(user = user)
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data ,200) 



# Admin Side
class ApplicationsList(APIView):
    def get(self, request):
        applications =  Application.objects.all()
        serializer   = ApplicationSerializer(applications, many=True)
        return Response(serializer.data, 200)


class ApproveApplication(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, id):
        Application.objects.filter(id = id).update(Approved = True)
        return Response(200)


class DenyApplication(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, id):
        Application.objects.filter(id = id).update(Denied = True)