from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from pets import views

urlpatterns = [
    path('pets/', views.PetList.as_view()),
    path('pets/<int:pk>/', views.PetDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)