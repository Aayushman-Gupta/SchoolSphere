from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Report

@csrf_exempt
def upload_report(request):
    if request.method == 'POST':
        # print("Reached the view function")
        title = request.POST.get('title')
        description = request.POST.get('description','')
        category = request.POST.get('category', '')
        is_public = request.POST.get('isPublic') == 'true'
        file = request.FILES.get('file')

        if not title or not file:
            return JsonResponse({'error': 'Title and file are required.'}, status=400)

        report = Report.objects.create(
            title=title,
            description=description,
            category=category,
            is_public=is_public,
            file=file
        )

        return JsonResponse({
            'message': 'Report uploaded successfully.',
            'report_id': report.id,
            'file_url': report.file.url
        }, status=201)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

def retrieve_reports(request):
    reports = Report.objects.filter(is_public=True).order_by('-uploaded_at')[:20]

    # Prepare the data to return
    report_data = [
        {
            'title': report.title,
            'description': report.description,
            'category': report.category,
            'file': report.file.url if report.file else None,
            'uploaded_at': report.uploaded_at.isoformat(),  # Format the date into string
        }
        for report in reports
    ]

    # Return the data as JSON
    return JsonResponse({'reports': report_data})


