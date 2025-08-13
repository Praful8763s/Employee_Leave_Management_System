import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import { leaveService } from '../services/leaveService'
import { formatDate } from '../utils/formatDate'
import 'react-calendar/dist/Calendar.css'

const CalendarView = () => {
  const [leaves, setLeaves] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaveCalendar()
  }, [])

  const fetchLeaveCalendar = async () => {
    try {
      const data = await leaveService.getLeaveCalendar()
      setLeaves(data)
    } catch (error) {
      console.error('Failed to fetch leave calendar:', error)
    } finally {
      setLoading(false)
    }
  }

  const isLeaveDate = (date) => {
    return leaves.some(leave => {
      const startDate = new Date(leave.start_date)
      const endDate = new Date(leave.end_date)
      return date >= startDate && date <= endDate
    })
  }

  const getLeavesForDate = (date) => {
    return leaves.filter(leave => {
      const startDate = new Date(leave.start_date)
      const endDate = new Date(leave.end_date)
      return date >= startDate && date <= endDate
    })
  }

  const tileClassName = ({ date }) => {
    if (isLeaveDate(date)) {
      return 'bg-primary-100 text-primary-800'
    }
    return null
  }

  const selectedDateLeaves = getLeavesForDate(selectedDate)

  if (loading) {
    return <div className="card">Loading calendar...</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Leave Calendar</h2>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={tileClassName}
          className="w-full"
        />
        <div className="mt-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary-100 border border-primary-200 rounded"></div>
            <span>Days with approved leave</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">
          Leave Details - {formatDate(selectedDate)}
        </h2>
        
        {selectedDateLeaves.length > 0 ? (
          <div className="space-y-3">
            {selectedDateLeaves.map((leave) => (
              <div key={leave.id} className="border-l-4 border-primary-500 pl-4 py-2">
                <div className="font-medium text-gray-900">
                  {leave.user.first_name} {leave.user.last_name}
                </div>
                <div className="text-sm text-gray-600">
                  {leave.leave_type.replace('_', ' ').toUpperCase()}
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(leave.start_date)} - {formatDate(leave.end_date)}
                </div>
                {leave.reason && (
                  <div className="text-sm text-gray-600 mt-1">
                    {leave.reason}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No approved leave requests for this date.</p>
        )}
      </div>
    </div>
  )
}

export default CalendarView