from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from .models import LeaveRequest
from .serializers import LeaveRequestSerializer, LeaveApprovalSerializer
from accounts.permissions import IsOwnerOrManager
from .utils import update_leave_balance

class LeaveRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = LeaveRequestSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_manager:
            # Managers can see all leave requests
            return LeaveRequest.objects.all()
        else:
            # Employees can only see their own requests
            return LeaveRequest.objects.filter(user=user)

class LeaveRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LeaveRequestSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrManager]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_manager:
            return LeaveRequest.objects.all()
        return LeaveRequest.objects.filter(user=user)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def approve_leave(request, pk):
    if not request.user.is_manager:
        return Response({'error': 'Only managers can approve leave requests'}, 
                       status=status.HTTP_403_FORBIDDEN)
    
    try:
        leave_request = LeaveRequest.objects.get(pk=pk)
    except LeaveRequest.DoesNotExist:
        return Response({'error': 'Leave request not found'}, 
                       status=status.HTTP_404_NOT_FOUND)
    
    serializer = LeaveApprovalSerializer(leave_request, data=request.data, partial=True)
    if serializer.is_valid():
        leave_request = serializer.save(approved_by=request.user)
        
        # Update user's leave balance if approved
        if leave_request.status == 'approved':
            update_leave_balance(leave_request)
        
        return Response(LeaveRequestSerializer(leave_request).data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def leave_calendar(request):
    # Get approved leave requests for calendar view
    approved_leaves = LeaveRequest.objects.filter(status='approved')
    serializer = LeaveRequestSerializer(approved_leaves, many=True)
    return Response(serializer.data)