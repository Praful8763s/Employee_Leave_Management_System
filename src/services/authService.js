import api from './api'

export const authService = {
  async login(credentials) {
    try {
      const response = await api.post('/auth/login/', credentials)
      const { access, refresh, user } = response.data
      
      // Store tokens
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      localStorage.setItem('user', JSON.stringify(user))
      
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/auth/register/', userData)
      const { access, refresh, user } = response.data
      
      // Store tokens
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      localStorage.setItem('user', JSON.stringify(user))
      
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async getProfile() {
    try {
      const response = await api.get('/auth/profile/')
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async updateProfile(userData) {
    try {
      const response = await api.patch('/auth/profile/', userData)
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
  },

  getCurrentUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated() {
    return !!localStorage.getItem('access_token')
  }
}