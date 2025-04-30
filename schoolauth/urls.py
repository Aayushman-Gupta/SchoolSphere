from django.contrib import admin
from django.urls import path,include
from .views import student_register_view, login_view, student_detail_view


urlpatterns = [
    # path('t/register/', TeacherRegistrationView.as_view(), name='login_teacher'),
    path('s/register/', student_register_view, name='student-register'),
    path('s/login/', login_view, name='student-login'),
    # path('s/logout/', views.logout_student, name='logout_student'),
    # path('t/login/', views.login_teacher, name='login_teacher'),
    # path('t/logout/', views.logout_teacher, name='logout_teacher'),
]