from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'employee_id', 'department')
    list_filter = ('role', 'department', 'is_staff', 'is_active')
    search_fields = ('username', 'email', 'employee_id', 'first_name', 'last_name')
    
    fieldsets = UserAdmin.fieldsets + (
        ('Employee Info', {
            'fields': ('role', 'employee_id', 'department', 'manager')
        }),
        ('Leave Balances', {
            'fields': ('vacation_balance', 'sick_balance', 'personal_balance')
        }),
    )