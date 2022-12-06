from rest_framework import serializers 
from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source = 'user.username')
    class Meta:
        model = Application
        fields = '__all__'