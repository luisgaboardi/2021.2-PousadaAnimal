from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from users import views
from rest_framework.authtoken import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('users/login', views.obtain_auth_token),
]

urlpatterns = format_suffix_patterns(urlpatterns)