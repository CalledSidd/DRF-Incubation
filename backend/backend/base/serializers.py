from rest_framework import serializers 
from .models import Application, Slot


class ApplicationSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source = 'user.username')
    class Meta:
        model = Application
        fields = '__all__'

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = '__all__'


class AllocatedCompanies(serializers.ModelSerializer):
    class Meta:
        model = Application 
        fields = ['id', 'company_name']

