import api from './api'

export const leaveService = {
  async getLeaveRequests() {
    try {
      const response = await api.get('/leaves/')
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async createLeaveRequest(leaveData) {
    try {
      const response = await api.post('/leaves/', leaveData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async updateLeaveRequest(id, leaveData) {
    try {
      const response = await api.patch(`/leaves/${id}/`, leaveData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async deleteLeaveRequest(id) {
    try {
      await api.delete(`/leaves/${id}/`)
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async approveLeave(id, approvalData) {
    try {
      const response = await api.patch(`/leaves/${id}/approve/`, approvalData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async getLeaveCalendar() {
    try {
      const response = await api.get('/leaves/calendar/')
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
}