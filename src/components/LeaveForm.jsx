import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { leaveService } from '../services/leaveService'

const LeaveForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await leaveService.createLeaveRequest(data)
      toast.success('Leave request submitted successfully!')
      reset()
      onSuccess?.()
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to submit leave request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Request Leave</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Leave Type
          </label>
          <select
            {...register('leave_type', { required: 'Leave type is required' })}
            className="input-field"
          >
            <option value="">Select leave type</option>
            <option value="vacation">Vacation</option>
            <option value="sick">Sick Leave</option>
            <option value="personal">Personal Leave</option>
            <option value="emergency">Emergency Leave</option>
          </select>
          {errors.leave_type && (
            <p className="text-red-500 text-sm mt-1">{errors.leave_type.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              {...register('start_date', { required: 'Start date is required' })}
              className="input-field"
            />
            {errors.start_date && (
              <p className="text-red-500 text-sm mt-1">{errors.start_date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              {...register('end_date', { required: 'End date is required' })}
              className="input-field"
            />
            {errors.end_date && (
              <p className="text-red-500 text-sm mt-1">{errors.end_date.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason
          </label>
          <textarea
            {...register('reason', { required: 'Reason is required' })}
            rows={3}
            className="input-field"
            placeholder="Please provide a reason for your leave request"
          />
          {errors.reason && (
            <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  )
}

export default LeaveForm