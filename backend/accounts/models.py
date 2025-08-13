from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('employee', 'Employee'),
        ('manager', 'Manager'),
    ]
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='employee')
    employee_id = models.CharField(max_length=20, unique=True, null=True, blank=True)
    department = models.CharField(max_length=100, blank=True)
    manager = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
    
    # Leave balances
    vacation_balance = models.IntegerField(default=20)  # Annual vacation days
    sick_balance = models.IntegerField(default=10)      # Annual sick days
    personal_balance = models.IntegerField(default=5)   # Personal days
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
    
    @property
    def is_manager(self):
        return self.role == 'manager'