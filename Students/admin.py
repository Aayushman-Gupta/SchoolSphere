from django.contrib import admin
from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('father_name','mother_name', 'student_id','gender','user')
    search_fields = ('student_id','student_class')
    list_filter = ('gender','student_class','section')
    readonly_field=('student_image')

# admin.site.register(Parent, ParentAdmin)
# admin.site.register(Student, StudentAdmin)
