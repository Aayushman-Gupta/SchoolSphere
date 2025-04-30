from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

class Student(models.Model):
    # User relationship
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Student fields
    student_id = models.CharField(max_length=15)
    gender = models.CharField(max_length=10, choices=[('Male','Male'),('Female','Female'),('Others','Others')])
    phone_number = models.CharField(max_length=15)
    date_of_birth = models.DateField()
    student_class = models.CharField(max_length=3)
    address = models.CharField(max_length=255, blank=True, null=True)
    student_image = models.ImageField(upload_to='student_images/', blank=True, null=True)
    section = models.CharField(max_length=3, null=True, blank=True)

    # Parent information (integrated directly)
    father_name = models.CharField(max_length=100)
    mother_name = models.CharField(max_length=100, blank=True, null=True)
    father_phone = models.CharField(max_length=15)

    # Additional fields
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.user.first_name}-{self.user.last_name}-{self.student_id}")
        super(Student, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.student_id}"  