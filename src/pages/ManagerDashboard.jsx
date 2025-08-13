import { useState, useEffect } from 'react'
import { leaveService } from '../services/leaveService'
import LeaveList from '../components/LeaveList'
import { Users, Clock, CheckCircle, XCircle } from 'lucide-react'

const ManagerDashboard = () => {
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaves()
  }, [])

  const fetchLeaves = async () => {
    try {
      const data = await leaveService.getLeaveRequests()
      setLeaves(data)
    } catch (error) {
      console.error('Failed to fetch leaves:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStats = () => {
    const pending = leaves.filter(leave => leave.status === 'pending').length
    const approved = leaves.filter(leave => leave.status === 'approved').length
    const rejected = leaves.filter(leave => leave.status === 'rejected').length
    const total = leaves.length

    return { pending, approved, rejected, total }
  }

  const stats = getStats()

  if (loading) {
    return <div className="text-center py-8">Loading manager dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Total Requests</p>
              <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="card bg-yellow-50 border-yellow-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-yellow-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Approved</p>
              <p className="text-2xl font-bold text-green-900">{stats.approved}</p>
            </div>
          </div>
        </div>

        <div className="card bg-red-50 border-red-200">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-red-600">Rejected</p>
              <p className="text-2xl font-bold text-red-900">{stats.rejected}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests - Priority */}
      {stats.pending > 0 && (
        <div className="card border-yellow-200 bg-yellow-50">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">
            Pending Requests Requiring Action ({stats.pending})
          </h2>
          <LeaveList 
            leaves={leaves.filter(leave => leave.status === 'pending')} 
            onUpdate={fetchLeaves} 
            isManager={true}
          />
        </div>
      )}

      {/* All Requests */}
      <LeaveList 
        leaves={leaves} 
        onUpdate={fetchLeaves} 
        isManager={true}
      />
    </div>
  )
}

export default ManagerDashboard