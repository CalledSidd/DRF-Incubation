from django.urls import path
from . import views 
from . views import MyTokenObtainPairSerializer, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('',views.getRoutes),
    path('token/',MyTokenObtainPairView.as_view(), name='token_otain_pair_view'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh')
]
