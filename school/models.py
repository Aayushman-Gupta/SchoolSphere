from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Report(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, blank=True)
    file = models.FileField(upload_to='reports/')
    is_public = models.BooleanField(default=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Teacher(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    teacher_id=models.CharField(max_length=20,null=True)
    teacher_image=models.ImageField(upload_to='student_image/',blank=True)

    def __str__(self):
       return f"{self.user.first_name} & {self.user.last_name}"
