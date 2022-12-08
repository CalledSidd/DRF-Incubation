from django.db import models
from django.contrib.auth.models import User 

# Create your models here.
class Application(models.Model):
    user         = models.ForeignKey(User, on_delete=models.CASCADE)
    name         = models.CharField(max_length=50)
    state        = models.CharField(max_length=50)
    email        = models.EmailField(max_length=100)
    city         =  models.CharField(max_length=50)
    phone        = models.CharField(max_length=50)
    address      = models.CharField(max_length=100)
    company_name = models.CharField(max_length=50)
    created_at   = models.DateTimeField(auto_now_add=True)
    # Allocation
    applied      = models.BooleanField(default=True)
    allotted     = models.BooleanField(default=False)
    Approved     = models.BooleanField(default=False)
    Denied       = models.BooleanField(default=False)
    def __str__(self):
        return self.company_name
    

class Slot(models.Model):
    user        = models.IntegerField(blank = True, null = True)
    company_name= models.CharField(max_length=100, null = True, blank= True, unique= True)
    number      = models.CharField(max_length= 50, unique=True)
    available   = models.BooleanField(default = True)
    reserved    = models.BooleanField(default = False)
    app         = models.IntegerField(blank=True, null =True ,unique = True)

    def __str__(self):
        return self.number




