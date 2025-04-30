from django.contrib import admin
from .models import Report
# Register your models here.

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'file')
    search_fields = ('title', 'description', 'file')
    list_filter = ('title','uploaded_at')