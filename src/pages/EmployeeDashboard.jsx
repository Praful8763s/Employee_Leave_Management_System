import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { leaveService } from '../services/leaveService'
import LeaveForm from '../components/LeaveForm'
import LeaveList from '../components/LeaveList'
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react'

const EmployeeDashboard = () => {
  const { user } = useAuth()
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

  const getLeaveStats = () => {
    const pending = leaves.filter(leave => leave.status === 'pending').length
    const approved = leaves.filter(leave => leave.status === 'approved').length
    const rejected = leaves.filter(leave => leave.status === 'rejected').length
    
    return { pending, approved, rejected }
  }

  const stats = getLeaveStats()

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.first_name || user?.username}!
        </h1>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Vacation Days</p>
              <p className="text-2xl font-bold text-blue-900">{user?.vacation_balance || 0}</p>
            </div>
          </div>
        </div>

        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Sick Days</p>
              <p className="text-2xl font-bold text-green-900">{user?.sick_balance || 0}</p>
            </div>
          </div>
        </div>

        <div className="card bg-purple-50 border-purple-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">Personal Days</p>
              <p className="text-2xl font-bold text-purple-900">{user?.personal_balance || 0}</p>
            </div>
          </div>
        </div>

        <div className="card bg-yellow-50 border-yellow-200">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-yellow-600">Pending Requests</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Request Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending Requests</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
          <div className="text-sm text-gray-600">Approved Requests</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
          <div className="text-sm text-gray-600">Rejected Requests</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeaveForm onSuccess={fetchLeaves} />
        <LeaveList 
          leaves={leaves.slice(0, 5)} 
          onUpdate={fetchLeaves} 
          showActions={true}
        />
      </div>
    </div>
  )
}

export default EmployeeDashboard