"""
URL configuration for SMS project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('add/',views.create_student),
    path('update/',views.update_student),
    path('retrieve/',views.retrieve_student),
    path('delete/',views.delete_student),
    path('list_students/',views.list_students),
    path('api/students/count-all-students/', views.count_all_students, name='count_all_students'),
    path('api/students/count-by-class/', views.count_students_by_class, name='count_students_by_class'),
    path('api/students/count-by-date/', views.count_with_date, name='count_students_by_date'),
    path('api/students/count-by-gender/', views.count_with_gender, name='count_with_gender')
]
