import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, User, Calendar, History, Home, Users } from 'lucide-react'

const Navbar = () => {
  const { user, logout, isAuthenticated, isManager } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-primary-600">
              Leave Management
            </Link>
            
            <div className="flex space-x-4">
              <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-primary-600">
                <Home size={18} />
                <span>Dashboard</span>
              </Link>
              
              {isManager && (
                <Link to="/manager" className="flex items-center space-x-1 text-gray-600 hover:text-primary-600">
                  <Users size={18} />
                  <span>Manager</span>
                </Link>
              )}
              
              <Link to="/history" className="flex items-center space-x-1 text-gray-600 hover:text-primary-600">
                <History size={18} />
                <span>History</span>
              </Link>
              
              <Link to="/calendar" className="flex items-center space-x-1 text-gray-600 hover:text-primary-600">
                <Calendar size={18} />
                <span>Calendar</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Welcome, {user?.first_name || user?.username}
            </span>
            
            <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-primary-600">
              <User size={18} />
              <span>Profile</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar