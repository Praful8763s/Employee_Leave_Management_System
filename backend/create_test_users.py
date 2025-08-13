#!/usr/bin/env python
"""
Script to create test users for the application
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from accounts.models import User

def create_test_users():
    """Create test users for development"""
    
    # Create superuser
    if not User.objects.filter(username='admin').exists():
        admin = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='admin123',
            first_name='Admin',
            last_name='User',
            role='manager'
        )
        print("✓ Created admin user (username: admin, password: admin123)")
    else:
        print("✓ Admin user already exists")
    
    # Create manager user
    if not User.objects.filter(username='manager').exists():
        manager = User.objects.create_user(
            username='manager',
            email='manager@example.com',
            password='manager123',
            first_name='John',
            last_name='Manager',
            role='manager',
            employee_id='MGR001',
            department='HR'
        )
        print("✓ Created manager user (username: manager, password: manager123)")
    else:
        print("✓ Manager user already exists")
    
    # Create employee user
    if not User.objects.filter(username='employee').exists():
        employee = User.objects.create_user(
            username='employee',
            email='employee@example.com',
            password='employee123',
            first_name='Jane',
            last_name='Employee',
            role='employee',
            employee_id='EMP001',
            department='IT',
            manager=User.objects.get(username='manager')
        )
        print("✓ Created employee user (username: employee, password: employee123)")
    else:
        print("✓ Employee user already exists")

def main():
    print("Creating test users...")
    print("=" * 30)
    
    try:
        create_test_users()
        print("\n✓ Test users created successfully!")
        print("\nLogin credentials:")
        print("Admin: admin / admin123")
        print("Manager: manager / manager123")
        print("Employee: employee / employee123")
    except Exception as e:
        print(f"✗ Error creating users: {e}")

if __name__ == "__main__":
    main()