LEAVE_TYPES = [
    ('vacation', 'Vacation'),
    ('sick', 'Sick Leave'),
    ('personal', 'Personal Leave'),
    ('emergency', 'Emergency Leave'),
]

STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('approved', 'Approved'),
    ('rejected', 'Rejected'),
]

USER_ROLES = [
    ('employee', 'Employee'),
    ('manager', 'Manager'),
]

DEFAULT_LEAVE_BALANCES = {
    'vacation': 20,
    'sick': 10,
    'personal': 5,
}