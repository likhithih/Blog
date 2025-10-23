import React from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import { FaUsers, FaBlog, FaComments, FaChartLine } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'

function Admin() {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <div className={`ml-0 md:ml-64 min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Header */}
      <div className={`shadow-sm border-b transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="px-6 py-4">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Admin Dashboard</h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Welcome back! Here's what's happening with your blog.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Users Card */}
          <div className={`rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Users</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>1,234</p>
              </div>
              <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                <FaUsers className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 text-sm font-medium">+12%</span>
              <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>from last month</span>
            </div>
          </div>

          {/* Blogs Card */}
          <div className={`rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Blogs</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>567</p>
              </div>
              <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-green-100'}`}>
                <FaBlog className={`text-xl ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 text-sm font-medium">+8%</span>
              <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>from last month</span>
            </div>
          </div>

          {/* Comments Card */}
          <div className={`rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Comments</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>2,891</p>
              </div>
              <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-purple-100'}`}>
                <FaComments className={`text-xl ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 text-sm font-medium">+15%</span>
              <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>from last month</span>
            </div>
          </div>

          {/* Analytics Card */}
          <div className={`rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Page Views</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>45.2K</p>
              </div>
              <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-orange-100'}`}>
                <FaChartLine className={`text-xl ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 text-sm font-medium">+23%</span>
              <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>from last month</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`rounded-lg shadow-sm border p-6 transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/users"
              className={`flex items-center p-4 rounded-lg transition-colors group ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-50 hover:bg-blue-100'}`}
            >
              <FaUsers className={`text-2xl mr-3 group-hover:scale-110 transition-transform ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Manage Users</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>View and manage user accounts</p>
              </div>
            </Link>

            <Link
              to="/admin/blogs"
              className={`flex items-center p-4 rounded-lg transition-colors group ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-50 hover:bg-green-100'}`}
            >
              <FaBlog className={`text-2xl mr-3 group-hover:scale-110 transition-transform ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              <div>
                <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Manage Blogs</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Review and moderate blog posts</p>
              </div>
            </Link>

            <Link
              to="/admin/comments"
              className={`flex items-center p-4 rounded-lg transition-colors group ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-purple-50 hover:bg-purple-100'}`}
            >
              <FaComments className={`text-2xl mr-3 group-hover:scale-110 transition-transform ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <div>
                <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Manage Comments</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Moderate user comments</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`rounded-lg shadow-sm border p-6 mt-6 transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Activity</h2>
          <div className="space-y-4">
            <div className={`flex items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-gray-600' : 'bg-green-100'}`}>
                <FaUsers className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>New user registered</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>John Doe joined 2 minutes ago</p>
              </div>
            </div>

            <div className={`flex items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-gray-600' : 'bg-blue-100'}`}>
                <FaBlog className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>New blog post published</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}> "The Future of AI" by Jane Smith 15 minutes ago</p>
              </div>
            </div>

            <div className={`flex items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-gray-600' : 'bg-purple-100'}`}>
                <FaComments className={`text-sm ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>New comment added</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Comment on "React Best Practices" 1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
