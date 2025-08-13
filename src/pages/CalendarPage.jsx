import CalendarView from '../components/CalendarView'

const CalendarPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Leave Calendar</h1>
      </div>
      
      <CalendarView />
    </div>
  )
}

export default CalendarPage