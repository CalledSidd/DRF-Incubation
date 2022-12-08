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
    path('declineApplication/<int:id>', views.DenyApplication.as_view(), name='denyapp'),
    path('viewApproved',views.ApprovedApplications.as_view(),name='approvedapps'),
    path('viewDeclined',views.DeniedApplications.as_view(),name='deniedapps'),
    path('approvedCompanies', views.ApprovedCompanies.as_view(), name='approvedcompanies'),
    path('allSlots',views.AllSlots.as_view(), name='allslots'),
    path('allocateSlot/<int:id>',views.AllocateSlot.as_view(),name='assingslot')
]
