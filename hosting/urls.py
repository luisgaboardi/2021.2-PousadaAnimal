from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from hosting import views

urlpatterns = [
    path('hosting/', views.HostingList.as_view()),
    path('hosting/<int:pk>/', views.HostingDetail.as_view()),
    path('hosting/<int:pk>/messages', views.HostingMessages.as_view()),
    path('payment/<int:pk>/', views.HostingPayment.as_view()),

]

urlpatterns = format_suffix_patterns(urlpatterns)