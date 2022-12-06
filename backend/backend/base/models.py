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
    application = models.ForeignKey(Application, on_delete=models.SET_NULL, null=True, blank=True, related_name='SlotBooking')
    number      = models.CharField(max_length= 50)
    available   = models.BooleanField(default = True)
    reserved    = models.BooleanField(default = False)

    def __str__(self):
        return self.application




