from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Student
from django.utils.text import slugify

class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model."""

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

class StudentSerializer(serializers.ModelSerializer):
    """Serializer for retrieving Student data."""
    user = UserSerializer(read_only=True)

    class Meta:
        model = Student
        fields = [
            'id', 'user', 'student_id', 'gender', 'phone_number',
            'date_of_birth', 'student_class', 'address', 'student_image',
            'section', 'father_name', 'mother_name', 'father_phone', 'slug'
        ]


def validate_username(value):
    if User.objects.filter(username=value).exists():
        raise serializers.ValidationError("This username is already taken.")
    return value

class StudentRegistrationSerializer(serializers.Serializer):
    """Serializer for creating new Student accounts."""
    # User fields
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)
    firstName = serializers.CharField(max_length=150)
    lastName = serializers.CharField(max_length=150)
    email = serializers.EmailField(required=False)

    # Student fields
    studentId = serializers.CharField(max_length=15)
    gender = serializers.CharField()
    phone = serializers.CharField(max_length=15)
    dob = serializers.DateField()
    class_field = serializers.CharField(max_length=3, source='student_class') #sourece is telli g us to wich identifier we are matching the class_field in our seri;izer .the mapped identifier will be later used as the variable to extract the value ...here it is"student_class"


    address = serializers.CharField(required=False)
    image = serializers.ImageField(required=False)
    section = serializers.CharField(max_length=3, required=False)

    # Parent fields (now part of Student)
    fatherName = serializers.CharField(max_length=100)
    motherName = serializers.CharField(max_length=100, required=False)
    fatherPhone = serializers.CharField(max_length=15)

    def validate(self, data):
        # Validate the username
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({"username": "This username is already taken."})
        return data

    def create(self, validated_data):
        # Extract User data
        user = User.objects.create_user(
            username=validated_data.get('username'),
            password=validated_data.get('password'),
            first_name=validated_data.get('firstName'),
            last_name=validated_data.get('lastName'),
            email=validated_data.get('email', '')
        )

        # Handle gender case
        gender_value = validated_data.get('gender', '').capitalize()
        if gender_value not in ['Male', 'Female']:
            gender_value = 'others'

        # Create Student with all fields
        student = Student.objects.create(
            user=user,
            student_id=validated_data.get('studentId'),
            gender=gender_value,
            phone_number=validated_data.get('phone'),
            date_of_birth=validated_data.get('dob'),
            student_class=validated_data.get('student_class'), #student_class is mapped identifier here ...
            address=validated_data.get('address', ''),
            student_image=validated_data.get('image'),
            section=validated_data.get('section'),
            father_name=validated_data.get('fatherName'),
            mother_name=validated_data.get('motherName', ''),
            father_phone=validated_data.get('fatherPhone')
        )

        # Generate slug
        student.slug = slugify(f"{user.first_name}-{user.last_name}-{student.student_id}")
        student.save()

        return student

class LoginSerializer(serializers.Serializer):
    """Serializer for user login."""
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)