from django.urls import path
from . import views 

urlpatterns = [
    path('signup', views.Signup.as_view(),name='signup'),
    path('registerApplication',views.RegisterApplication.as_view(),name='regapp'),
    path('checkApplication',views.CheckApplication.as_view(),name='checkapp'),
]
