from django.urls import path
from . import views 

urlpatterns = [
    # User
    path('signup', views.Signup.as_view(),name='signup'),
    path('registerApplication',views.RegisterApplication.as_view(),name='regapp'),
    path('checkApplication',views.CheckApplication.as_view(),name='checkapp'),
    path('applications', views.ApplicationsList.as_view(), name='newapps'),
    # Admin
    path('allApplications',views.AllApplications.as_view(), name='allapps'),
    path('approveApplication/<int:id>' ,views.ApproveApplication.as_view(), name='approveapp'),
    
]
