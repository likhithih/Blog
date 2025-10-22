import React from 'react'
import Sidebar from './Sidebar'
import { useTheme } from '../contexts/ThemeContext'
import { FaMoon, FaSun } from 'react-icons/fa'

const Blog = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="ml-0 md:ml-64">
      <Sidebar darkMode={darkMode} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Blog Management</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors duration-200 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-600'}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Manage your blog posts here.
        </div>
      </div>
    </div>
  )
}

export default Blog