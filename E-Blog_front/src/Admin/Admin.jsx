import React from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import { FaUsers, FaBlog, FaComments, FaChartLine } from 'react-icons/fa'

function Admin() {
  return (
    <div className="ml-0 md:ml-64 bg-gray-50 min-h-screen">
      <Sidebar />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your blog.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Users Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaUsers className="text-blue-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 text-sm font-medium">+12%</span>
              <span className="text-gray-500 text-sm ml-2">from last month</span>
            </div>
          </div>

          {/* Blogs Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Blogs</p>
                <p className="text-2xl font-bold text-gray-900">567</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaBlog className="text-green-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 text-sm font-medium">+8%</span>
              <span className="text-gray-500 text-sm ml-2">from last month</span>
            </div>
          </div>

          {/* Comments Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Comments</p>
                <p className="text-2xl font-bold text-gray-900">2,891</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaComments className="text-purple-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 text-sm font-medium">+15%</span>
              <span className="text-gray-500 text-sm ml-2">from last month</span>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Page Views</p>
                <p className="text-2xl font-bold text-gray-900">45.2K</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FaChartLine className="text-orange-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 text-sm font-medium">+23%</span>
              <span className="text-gray-500 text-sm ml-2">from last month</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/users"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
            >
              <FaUsers className="text-blue-600 text-2xl mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="font-medium text-gray-900">Manage Users</h3>
                <p className="text-sm text-gray-600">View and manage user accounts</p>
              </div>
            </Link>

            <Link
              to="/admin/blogs"
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
            >
              <FaBlog className="text-green-600 text-2xl mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="font-medium text-gray-900">Manage Blogs</h3>
                <p className="text-sm text-gray-600">Review and moderate blog posts</p>
              </div>
            </Link>

            <Link
              to="/admin/comments"
              className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
            >
              <FaComments className="text-purple-600 text-2xl mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="font-medium text-gray-900">Manage Comments</h3>
                <p className="text-sm text-gray-600">Moderate user comments</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <FaUsers className="text-green-600 text-sm" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New user registered</p>
                <p className="text-xs text-gray-500">John Doe joined 2 minutes ago</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <FaBlog className="text-blue-600 text-sm" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New blog post published</p>
                <p className="text-xs text-gray-500">"The Future of AI" by Jane Smith 15 minutes ago</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <FaComments className="text-purple-600 text-sm" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New comment added</p>
                <p className="text-xs text-gray-500">Comment on "React Best Practices" 1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
