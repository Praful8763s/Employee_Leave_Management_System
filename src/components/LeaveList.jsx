import { useState } from 'react'
import { formatDate } from '../utils/formatDate'
import { Check, X, Edit, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { leaveService } from '../services/leaveService'

const LeaveList = ({ leaves, onUpdate, showActions = false, isManager = false }) => {
  const [loading, setLoading] = useState({})

  const handleApproval = async (leaveId, status, comments = '') => {
    setLoading(prev => ({ ...prev, [leaveId]: true }))
    try {
      await leaveService.approveLeave(leaveId, { status, manager_comments: comments })
      toast.success(`Leave request ${status} successfully!`)
      onUpdate?.()
    } catch (error) {
      toast.error(error.response?.data?.detail || `Failed to ${status} leave request`)
    } finally {
      setLoading(prev => ({ ...prev, [leaveId]: false }))
    }
  }

  const handleDelete = async (leaveId) => {
    if (!window.confirm('Are you sure you want to delete this leave request?')) {
      return
    }
    
    setLoading(prev => ({ ...prev, [leaveId]: true }))
    try {
      await leaveService.deleteLeaveRequest(leaveId)
      toast.success('Leave request deleted successfully!')
      onUpdate?.()
    } catch (error) {
      toast.error('Failed to delete leave request')
    } finally {
      setLoading(prev => ({ ...prev, [leaveId]: false }))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-yellow-600 bg-yellow-100'
    }
  }

  if (!leaves?.length) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-500">No leave requests found</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">
        {isManager ? 'All Leave Requests' : 'My Leave Requests'}
      </h2>
      
      <div className="space-y-4">
        {leaves.map((leave) => (
          <div key={leave.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  {isManager && (
                    <span className="font-medium text-gray-900">
                      {leave.user.first_name} {leave.user.last_name}
                    </span>
                  )}
                  <span className="capitalize font-medium text-primary-600">
                    {leave.leave_type.replace('_', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                    {leave.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  <span>{formatDate(leave.start_date)} - {formatDate(leave.end_date)}</span>
                  <span className="ml-4">({leave.duration_days} days)</span>
                </div>
                
                <p className="text-gray-700 mb-2">{leave.reason}</p>
                
                {leave.manager_comments && (
                  <div className="bg-gray-100 p-2 rounded text-sm">
                    <strong>Manager Comments:</strong> {leave.manager_comments}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {isManager && leave.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApproval(leave.id, 'approved')}
                      disabled={loading[leave.id]}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
                      title="Approve"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() => {
                        const comments = prompt('Add comments (optional):')
                        handleApproval(leave.id, 'rejected', comments || '')
                      }}
                      disabled={loading[leave.id]}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                      title="Reject"
                    >
                      <X size={18} />
                    </button>
                  </>
                )}
                
                {showActions && leave.status === 'pending' && (
                  <>
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(leave.id)}
                      disabled={loading[leave.id]}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeaveList