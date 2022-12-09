from django.contrib import admin
from . models import Slot, Application, BookingSlot

# Register your models here.
admin.site.register(Slot)
admin.site.register(Application)
admin.site.register(BookingSlot)