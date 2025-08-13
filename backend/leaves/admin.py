from django.contrib import admin
from .models import LeaveRequest

@admin.register(LeaveRequest)
class LeaveRequestAdmin(admin.ModelAdmin):
    list_display = ('user', 'leave_type', 'start_date', 'end_date', 'status', 'duration_days', 'created_at')
    list_filter = ('leave_type', 'status', 'created_at')
    search_fields = ('user__username', 'user__email', 'reason')
    readonly_fields = ('duration_days', 'created_at', 'updated_at')
    
    fieldsets = (
        ('Leave Details', {
            'fields': ('user', 'leave_type', 'start_date', 'end_date', 'reason')
        }),
        ('Status', {
            'fields': ('status', 'manager_comments', 'approved_by')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )