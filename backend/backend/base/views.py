from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Q



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status



from . serializers import ApplicationSerializer, SlotSerializer, AllocatedCompanies
from . models import Application, Slot , BookingSlot
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
        return Response(status = status.HTTP_200_OK)

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
            'type'     : "",
        }
        return Response(post)

    def post(self, request):
        body         = request.body.decode('utf-8')
        body         = json.loads(body)
        body         = body['data']
        typeof       = body['type_of']
        print(typeof,"This is the type of incubation")
        print("user", request.user.id)
        user         = request.user 
        username     = body['username']
        name         = body['username']
        address      = body['address']
        city         = body['city']
        state        = body['state']
        phone        = body['phone']
        email        = body['email']
        company_name = body['company_name']
        applications = Application.objects.create(
            user = user, typeof = typeof, name = name,
            address  = address,city         = city,
            state    = state,  email        = email,
            phone    = phone,  company_name = company_name
        ) 
        print(applications)
        applications.save()
        return Response(status = status.HTTP_200_OK)


class CheckApplication(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user 
        if not Application.objects.filter(user = user).exists():
            return Response(status = status.HTTP_200_OK)
        if Application.objects.filter(Q(user = user) & Q(Denied = True)):
            return Response(status = status.HTTP_200_OK)
        
        if Application.objects.filter(Q(user = user) & Q(applied= True) & ~Q(allotted = True)).exists():
            return Response(status = status.HTTP_403_FORBIDDEN)
        elif Application.objects.filter(Q(user = user) & Q(applied = True) & Q(Approved = True)).exists():
            return Response(status = status.HTTP_403_FORBIDDEN)

        
        return Response(status = status.HTTP_200_OK)



class UserApplications(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        applications = Application.objects.filter(user = user)
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data ,status = status.HTTP_200_OK) 



# Admin Side
class ApplicationsList(APIView):
    def get(self, request):
        applications =  Application.objects.filter(Q(applied = True) & Q(Approved = False) & Q(Denied = False))
        serializer   = ApplicationSerializer(applications, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)


class ApproveApplication(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, id):
        Application.objects.filter(id = id).update(Approved = True)
        return Response(status = status.HTTP_200_OK)


class DenyApplication(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, id):
        Application.objects.filter(id = id).update(Denied = True)
        return Response(status = status.HTTP_200_OK)


class AllApplications(APIView):
    def get(self, request):
        apps = Application.filter.all()
        serializer = ApplicationSerializer(apps, many = True)
        return response(serializer.data, status = status.HTTP_200_OK)


class ApprovedApplications(APIView):
    def get(self, request):
        apps = Application.objects.filter(Q(Approved = True))
        serializer = ApplicationSerializer(apps, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)

class DeniedApplications(APIView):
    def get(self, request):
        apps = Application.objects.filter(Q(Denied = True))
        serializer = ApplicationSerializer(apps, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)


class GetAllottedApplication(APIView):
    def get(self, request, id):
        App = Application.objects.filter(id = id)
        serializer = AllocatedCompanies(App, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)


class ApprovedCompanies(APIView):
    def get(self, request):
        company = Application.objects.filter(Q(Approved = True) & Q(allotted = False))
        serializer = AllocatedCompanies(company, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)


class AllSlots(APIView):
    def get(self, request):
        slots = Slot.objects.all()
        for slot in slots:
            print(slot.user)
        serializer = SlotSerializer(slots, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)

class AllocateSlot(APIView):
    def get(self, request, id, company_name):
        print(id,company_name, "Id and company name of the Allocated Companies")
        App = Application.objects.filter(id=id)
        Slot.objects.filter(id = id).update( company_name = company_name)
        Application.objects.filter(Q(Approved=True), company_name = company_name).update(allotted=True)
        return Response(status = status.HTTP_200_OK)
