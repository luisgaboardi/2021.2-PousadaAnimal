from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from users.views import UserList, UserDetail, UserLogin, UserPets, UserHostings

urlpatterns = [
    path('users/', UserList.as_view()),
    path('users/<int:pk>/', UserDetail.as_view()),
    path('users/login/', UserLogin.as_view()),
    path('users/<int:pk>/pets', UserPets.as_view()),
    path('users/<int:pk>/hostings', UserHostings.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)