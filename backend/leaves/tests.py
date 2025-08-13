from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from datetime import date, timedelta
from .models import LeaveRequest

User = get_user_model()

class LeaveRequestModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
    
    def test_create_leave_request(self):
        leave = LeaveRequest.objects.create(
            user=self.user,
            leave_type='vacation',
            start_date=date.today() + timedelta(days=1),
            end_date=date.today() + timedelta(days=3),
            reason='Family vacation'
        )
        self.assertEqual(leave.duration_days, 3)
        self.assertEqual(leave.status, 'pending')

class LeaveAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='employee',
            email='emp@example.com',
            password='testpass123'
        )
        self.manager = User.objects.create_user(
            username='manager',
            email='mgr@example.com',
            password='testpass123',
            role='manager'
        )
    
    def test_create_leave_request(self):
        self.client.force_authenticate(user=self.user)
        data = {
            'leave_type': 'vacation',
            'start_date': date.today() + timedelta(days=1),
            'end_date': date.today() + timedelta(days=3),
            'reason': 'Family vacation'
        }
        response = self.client.post('/api/leaves/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)