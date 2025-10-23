import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import { FaUser, FaEnvelope, FaCalendarAlt, FaCrown, FaTrash, FaTimes, FaSearch, FaTable, FaTh, FaEdit, FaCheck, FaTimes as FaTimesX, FaChevronUp, FaChevronDown, FaCheckCircle, FaTimesCircle, FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'

function Users() {
  const { darkMode, toggleDarkMode } = useTheme()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // New state for enhanced UI
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'table'
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [editUser, setEditUser] = useState(null)
  const [editRole, setEditRole] = useState('')
  const [editLoading, setEditLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:4000/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUsers(response.data.users)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching users:', error)
      setError('Failed to fetch users')
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleCardClick = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const handleDeleteUser = async (user) => {
    if (!user) return

    setDeleteLoading(true)
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:4000/users/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // Remove user from state
      setUsers(users.filter(u => u._id !== user._id))
      if (selectedUser && selectedUser._id === user._id) {
        setShowModal(false)
        setSelectedUser(null)
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete user')
    } finally {
      setDeleteLoading(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedUser(null)
  }



  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1
    }
    return 0
  })

  const filteredUsers = sortedUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(currentUsers.map(user => user._id))
    }
  }

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return

    if (!confirm(`Are you sure you want to delete ${selectedUsers.length} user(s)?`)) return

    setDeleteLoading(true)
    try {
      const token = localStorage.getItem('token')
      await Promise.all(
        selectedUsers.map(userId =>
          axios.delete(`http://localhost:4000/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        )
      )

      setUsers(users.filter(user => !selectedUsers.includes(user._id)))
      setSelectedUsers([])
    } catch (error) {
      console.error('Error deleting users:', error)
      alert('Failed to delete some users')
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleEditUser = (user) => {
    setEditUser(user)
    setEditRole(user.role)
  }

  const handleSaveEdit = async () => {
    if (!editUser) return

    setEditLoading(true)
    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:4000/users/${editUser._id}`, {
        role: editRole
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setUsers(users.map(user =>
        user._id === editUser._id ? { ...user, role: editRole } : user
      ))
      setEditUser(null)
      setEditRole('')
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Failed to update user role')
    } finally {
      setEditLoading(false)
    }
  }

  const getStatusIcon = (user) => {
    // Assuming active status based on recent activity, for demo purposes
    const isActive = new Date(user.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    return isActive ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />
  }

  if (loading) {
    return (
      <div className="ml-0 md:ml-64 bg-gray-50 min-h-screen pt-16 md:pt-0">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="ml-0 md:ml-64 bg-gray-50 min-h-screen">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`ml-0 md:ml-64 min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Header */}
      <div className={`shadow-sm border-b transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>User Management</h1>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Manage and view all registered users</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'grid' ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-600')}`}
              >
                <FaTh />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'table' ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-600')}`}
              >
                <FaTable />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={`p-4 md:p-6 border-b transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
              />
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {filteredUsers.length} of {users.length} users
            </div>
          </div>
          {selectedUsers.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {selectedUsers.length} selected
              </span>
              <button
                onClick={handleBulkDelete}
                disabled={deleteLoading}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {deleteLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <FaTrash className="mr-2" />
                )}
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {currentUsers.map((user) => (
              <div key={user._id} onClick={() => handleCardClick(user)} className={`group rounded-2xl shadow-lg hover:shadow-2xl border transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-100 hover:border-indigo-200'}`}>
                <div className="p-4 md:p-6">
                  {/* User Avatar and Role */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <FaUser className="text-white text-2xl" />
                      </div>
                      <div className="ml-4">
                        <h3 className={`text-xl font-bold group-hover:text-blue-400 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.username}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {user.role === 'admin' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md">
                              <FaCrown className="mr-1" />
                              Admin
                            </span>
                          )}
                          {getStatusIcon(user)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Details */}
                  <div className="space-y-4">
                    <div className={`flex items-center rounded-lg p-3 border transition-all duration-300 ${darkMode ? 'text-gray-300 bg-gray-700 border-gray-600 group-hover:bg-gray-600 group-hover:border-blue-500' : 'text-gray-700 bg-gray-50 border-gray-200 group-hover:bg-indigo-50 group-hover:border-indigo-300'}`}>
                      <FaEnvelope className="mr-3 text-blue-500" />
                      <span className="text-sm font-medium truncate flex-1">{user.email}</span>
                    </div>

                    <div className={`flex items-center rounded-lg p-3 border transition-all duration-300 ${darkMode ? 'text-gray-300 bg-gray-700 border-gray-600 group-hover:bg-gray-600 group-hover:border-purple-500' : 'text-gray-700 bg-gray-50 border-gray-200 group-hover:bg-purple-50 group-hover:border-purple-300'}`}>
                      <FaCalendarAlt className="mr-3 text-purple-500" />
                      <span className="text-sm font-medium">Joined {formatDate(user.createdAt)}</span>
                    </div>
                  </div>

                  {/* User ID */}
                  <div className={`mt-6 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className={`rounded-lg p-2 border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <p className={`text-xs font-mono text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID: {user._id.slice(-8)}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditUser(user);
                      }}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </button>
                    {user.role !== 'admin' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(user);
                        }}
                        disabled={deleteLoading}
                        className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {deleteLoading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                          <FaTrash />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`rounded-lg border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className={`overflow-x-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-opacity-75 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} onClick={() => handleSort('username')}>
                      Username {sortConfig.key === 'username' && (sortConfig.direction === 'asc' ? <FaChevronUp className="inline ml-1" /> : <FaChevronDown className="inline ml-1" />)}
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-opacity-75 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} onClick={() => handleSort('email')}>
                      Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? <FaChevronUp className="inline ml-1" /> : <FaChevronDown className="inline ml-1" />)}
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-opacity-75 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} onClick={() => handleSort('role')}>
                      Role {sortConfig.key === 'role' && (sortConfig.direction === 'asc' ? <FaChevronUp className="inline ml-1" /> : <FaChevronDown className="inline ml-1" />)}
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-opacity-75 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} onClick={() => handleSort('createdAt')}>
                      Joined {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? <FaChevronUp className="inline ml-1" /> : <FaChevronDown className="inline ml-1" />)}
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Status</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}`}>
                  {currentUsers.map((user) => (
                    <tr key={user._id} className={`hover:bg-opacity-75 cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`} onClick={() => handleCardClick(user)}>
                      <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user._id)}
                          onChange={() => handleSelectUser(user._id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.username}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.role === 'admin' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                            <FaCrown className="mr-1" />
                            Admin
                          </span>
                        ) : (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                            User
                          </span>
                        )}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{formatDate(user.createdAt)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusIcon(user)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className={`p-1 rounded transition-colors duration-200 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'}`}
                          >
                            <FaEdit />
                          </button>
                          {user.role !== 'admin' && (
                            <button
                              onClick={() => handleDeleteUser(user)}
                              disabled={deleteLoading}
                              className="p-1 rounded text-red-600 hover:text-red-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded transition-colors duration-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded transition-colors duration-200 ${page === currentPage ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700')}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded transition-colors duration-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''} ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <FaUser className={`mx-auto h-12 w-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className={`mt-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-900'}`}>No users found</h3>
            <p className={`mt-1 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>No users match your search criteria.</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-2xl shadow-2xl max-w-md w-full mx-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Edit User Role</h2>
                <button
                  onClick={() => setEditUser(null)}
                  className={`transition-colors duration-200 ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* User Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl shadow-lg">
                    <FaUser className="text-white text-2xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{editUser.username}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{editUser.email}</p>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Role</label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setEditUser(null)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${darkMode ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={editLoading}
                  className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {editLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <FaCheck className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-2xl shadow-2xl max-w-md w-full mx-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>User Details</h2>
                <button
                  onClick={closeModal}
                  className={`transition-colors duration-200 ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* User Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl shadow-lg">
                    <FaUser className="text-white text-2xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedUser.username}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {selectedUser.role === 'admin' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md">
                          <FaCrown className="mr-1" />
                          Admin
                        </span>
                      )}
                      {getStatusIcon(selectedUser)}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className={`flex items-center rounded-lg p-3 border ${darkMode ? 'text-gray-300 bg-gray-700 border-gray-600' : 'text-gray-700 bg-gray-50 border-gray-200'}`}>
                    <FaEnvelope className="mr-3 text-blue-500" />
                    <span className="text-sm font-medium">{selectedUser.email}</span>
                  </div>

                  <div className={`flex items-center rounded-lg p-3 border ${darkMode ? 'text-gray-300 bg-gray-700 border-gray-600' : 'text-gray-700 bg-gray-50 border-gray-200'}`}>
                    <FaCalendarAlt className="mr-3 text-purple-500" />
                    <span className="text-sm font-medium">Joined {formatDate(selectedUser.createdAt)}</span>
                  </div>

                  <div className={`rounded-lg p-3 border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <p className={`text-xs font-mono text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID: {selectedUser._id}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={closeModal}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${darkMode ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  Cancel
                </button>
                {selectedUser.role !== 'admin' && (
                  <button
                    onClick={() => handleDeleteUser(selectedUser)}
                    disabled={deleteLoading}
                    className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {deleteLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <FaTrash className="mr-2" />
                        Delete User
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users
