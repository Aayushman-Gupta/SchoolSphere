from rest_framework import serializers
from django.contrib.auth.models import User
from school.models import Teacher

class TeacherSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Teacher
        fields = [
            'username', 'password', 'teacher_id','teacher_image'
        ]

    def create(self, validated_data):
        username = serializers.CharField(max_length=150)
        password = serializers.CharField(write_only=True, validators=[validate_password])
        first_name = serializers.CharField(max_length=150, source="firstName")
        last_name = serializers.CharField(max_length=150, source="lastName")
        teacher_id = serializers.CharField(max_length=15, source="teacherId")

        # Create User
        user = User.objects.create_user(username=username, password=password,first_name=first_name,last_name=last_name)
        # Create Teacher profile
        teacher = Teacher.objects.create(user=user, **validated_data)
        return user
