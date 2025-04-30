from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from Students.serializers import StudentRegistrationSerializer, LoginSerializer, StudentSerializer
from Students.models import Student
from django.contrib.auth.models import User
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([AllowAny])
def student_register_view(request):
    """API view for student registration."""
    print("Received data:", request.data)
    logger.info(f"Registration data received: {request.data}")

    serializer = StudentRegistrationSerializer(data=request.data)

    if serializer.is_valid():
        student = serializer.save()
        student_data = StudentSerializer(student).data

        # Generate JWT tokens
        refresh = RefreshToken.for_user(student.user)
        tokens = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        return Response({
            'student': student_data,
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_201_CREATED)

    logger.error(f"Validation errors: {serializer.errors}")
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """API view for user login."""
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)

            try:
                student = Student.objects.get(user=user)
                student_data = StudentSerializer(student).data

                return Response({
                    'student': student_data,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_200_OK)
            except Student.DoesNotExist:
                return Response({
                    'detail': 'Student profile not found for this user',
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def student_detail_view(request, slug):
    """API view to get a specific student by slug."""
    try:
        student = Student.objects.get(slug=slug)
        serializer = StudentSerializer(student)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Student.DoesNotExist:
        return Response({'detail': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)