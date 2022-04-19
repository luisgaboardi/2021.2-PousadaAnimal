from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from services import views

urlpatterns = [
    path('services/', views.ServiceList.as_view()),
    path('services/<int:pk>/', views.ServiceDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)