#!/usr/bin/env python
"""
Test script to check Django backend setup and database connection
"""
import os
import sys
import django

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Setup Django
django.setup()

def test_database_connection():
    """Test database connection"""
    try:
        from django.db import connection
        cursor = connection.cursor()
        cursor.execute("SELECT 1")
        print("✓ Database connection successful")
        return True
    except Exception as e:
        print(f"✗ Database connection failed: {e}")
        return False

def test_models():
    """Test model imports and basic operations"""
    try:
        from accounts.models import User
        from leaves.models import LeaveRequest
        
        # Test model creation (without saving)
        user_count = User.objects.count()
        leave_count = LeaveRequest.objects.count()
        
        print(f"✓ Models imported successfully")
        print(f"  - Users in database: {user_count}")
        print(f"  - Leave requests in database: {leave_count}")
        return True
    except Exception as e:
        print(f"✗ Model test failed: {e}")
        return False

def test_serializers():
    """Test serializer imports"""
    try:
        from accounts.serializers import UserRegistrationSerializer, UserLoginSerializer
        from leaves.serializers import LeaveRequestSerializer
        print("✓ Serializers imported successfully")
        return True
    except Exception as e:
        print(f"✗ Serializer test failed: {e}")
        return False

def main():
    print("Testing Django Backend Setup...")
    print("=" * 40)
    
    tests = [
        test_database_connection,
        test_models,
        test_serializers,
    ]
    
    passed = 0
    for test in tests:
        if test():
            passed += 1
        print()
    
    print(f"Tests passed: {passed}/{len(tests)}")
    
    if passed == len(tests):
        print("✓ Backend setup is working correctly!")
    else:
        print("✗ Some tests failed. Check the errors above.")

if __name__ == "__main__":
    main()