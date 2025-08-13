from django.contrib.auth import get_user_model

User = get_user_model()

def update_leave_balance(leave_request):
    """Update user's leave balance when leave is approved"""
    user = leave_request.user
    days = leave_request.duration_days
    
    if leave_request.leave_type == 'vacation':
        user.vacation_balance = max(0, user.vacation_balance - days)
    elif leave_request.leave_type == 'sick':
        user.sick_balance = max(0, user.sick_balance - days)
    elif leave_request.leave_type == 'personal':
        user.personal_balance = max(0, user.personal_balance - days)
    
    user.save()

def check_leave_balance(user, leave_type, days):
    """Check if user has sufficient leave balance"""
    if leave_type == 'vacation':
        return user.vacation_balance >= days
    elif leave_type == 'sick':
        return user.sick_balance >= days
    elif leave_type == 'personal':
        return user.personal_balance >= days
    return True  # Emergency leave doesn't require balance check