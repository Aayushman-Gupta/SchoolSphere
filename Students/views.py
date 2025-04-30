from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .serializers import StudentSerializer
from .models import Student
from django.db.models.functions import TruncDate
from django.db.models import Count
from django.http import JsonResponse

# Create a student
@api_view(['POST'])
def create_student(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get all students
@api_view(['GET'])
def list_students(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

# Get a single student
@api_view(['GET'])
def retrieve_student(request, id):
    # try:
    #     student = Student.objects.get(student_id=id)
    # except Student.DoesNotExist:
    #     return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
    student = get_object_or_404(Student, student_id=id)
    serializer = StudentSerializer(student)
    return Response(serializer.data)

# Update a student
@api_view(['PUT'])
def update_student(request, id):
    try:
        student = Student.objects.get(student_id=id)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = StudentSerializer(student, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete a student
@api_view(['DELETE'])
def delete_student(request, id):
    try:
        student = Student.objects.get(student_id=id)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

    student.delete()
    return Response({'message': 'Student deleted'}, status=status.HTTP_204_NO_CONTENT)

def count_all_students(request):
    count= Student.objects.all().count()
    return JsonResponse({"count": count})

def count_students_by_class(request):
    # print(Student.objects.all().values())
    batches = ['10E','10H', '11E','11H','12E','12H']
    data = []
    for batch in batches:
        count = Student.objects.filter(student_class=batch).count()
        data.append({
            "batch": batch,
            "studentCount": count
        })
    return JsonResponse(data, safe=False)

def count_with_date(request):
    data = (
    Student.objects.exclude(admission=None)
    .annotate(date=TruncDate('admission'))
    .values('date')
    .annotate(count=Count('id'))
    .order_by('date')
    )
    formatted_data = [{'date': entry['date'], 'studentCount': entry['count']} for entry in data]
    return JsonResponse(formatted_data, safe=False)

def count_with_gender(request):
    student_genders=['Male','Female','others']
    data=[]
    for student_gender in student_genders:
        count=len(Student.objects.filter(gender=student_gender))
        data.append({
            "gender":student_gender,
            "gender_count":count
        })
        print(count)

    return JsonResponse(data,safe=False)
