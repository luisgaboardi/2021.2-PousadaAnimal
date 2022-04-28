from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from host import views

urlpatterns = [
    path('host/', views.HostList.as_view()),
    path('host/<int:pk>/', views.HostDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)