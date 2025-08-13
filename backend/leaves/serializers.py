from rest_framework import serializers
from .models import LeaveRequest
from accounts.serializers import UserProfileSerializer

class LeaveRequestSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    approved_by = UserProfileSerializer(read_only=True)
    duration_days = serializers.ReadOnlyField()
    
    class Meta:
        model = LeaveRequest
        fields = ['id', 'user', 'leave_type', 'start_date', 'end_date', 
                 'reason', 'status', 'manager_comments', 'approved_by', 
                 'duration_days', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'status', 'approved_by', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class LeaveApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = ['status', 'manager_comments']
    
    def validate_status(self, value):
        if value not in ['approved', 'rejected']:
            raise serializers.ValidationError("Status must be 'approved' or 'rejected'")
        return value