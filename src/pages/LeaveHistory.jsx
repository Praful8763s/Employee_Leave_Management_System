import { useState, useEffect } from 'react'
import { leaveService } from '../services/leaveService'
import LeaveList from '../components/LeaveList'
import { useAuth } from '../context/AuthContext'

const LeaveHistory = () => {
  const { isManager } = useAuth()
  const [leaves, setLeaves] = useState([])
  const [filteredLeaves, setFilteredLeaves] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: '',
    leave_type: '',
    year: new Date().getFullYear()
  })

  useEffect(() => {
    fetchLeaves()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [leaves, filters])

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

  const applyFilters = () => {
    let filtered = [...leaves]

    if (filters.status) {
      filtered = filtered.filter(leave => leave.status === filters.status)
    }

    if (filters.leave_type) {
      filtered = filtered.filter(leave => leave.leave_type === filters.leave_type)
    }

    if (filters.year) {
      filtered = filtered.filter(leave => {
        const leaveYear = new Date(leave.start_date).getFullYear()
        return leaveYear === parseInt(filters.year)
      })
    }

    setFilteredLeaves(filtered)
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      status: '',
      leave_type: '',
      year: new Date().getFullYear()
    })
  }

  if (loading) {
    return <div className="text-center py-8">Loading leave history...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Leave History</h1>
      </div>

      {/* Filters */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="input-field"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Leave Type
            </label>
            <select
              value={filters.leave_type}
              onChange={(e) => handleFilterChange('leave_type', e.target.value)}
              className="input-field"
            >
              <option value="">All Types</option>
              <option value="vacation">Vacation</option>
              <option value="sick">Sick Leave</option>
              <option value="personal">Personal Leave</option>
              <option value="emergency">Emergency Leave</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <select
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              className="input-field"
            >
              {[2024, 2023, 2022, 2021].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="btn-secondary w-full"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredLeaves.length} of {leaves.length} requests
        </div>
      </div>

      {/* Leave History */}
      <LeaveList 
        leaves={filteredLeaves} 
        onUpdate={fetchLeaves} 
        isManager={isManager}
        showActions={false}
      />
    </div>
  )
}

export default LeaveHistory