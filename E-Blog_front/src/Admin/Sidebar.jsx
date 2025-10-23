import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaMoon, FaSun, FaUser } from "react-icons/fa";

export default function Sidebar({ darkMode = false, toggleDarkMode }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show sidebar only on admin pages
  if (!location.pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* Hamburger button on mobile */}
      {isMobile && (
        <button
          className={`text-3xl p-3 fixed top-4 right-4 z-60 transition rounded-lg shadow-lg ${darkMode ? 'text-gray-300 hover:text-blue-400 bg-gray-800' : 'text-gray-700 hover:text-violet-600 bg-white'}`}
          onClick={() => setOpen(!open)}
        >
          <GiHamburgerMenu />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 z-50 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} ${
          isMobile
            ? (open ? "translate-x-0" : "-translate-x-full")
            : "translate-x-0"
        }`}
      >
        <div>
          <h2 className={`text-2xl font-bold mb-6 pt-13 pb-4 border-b ${darkMode ? 'text-blue-400 border-gray-600' : 'text-violet-700 border-gray-300'}`}>
           <Link to="/admin" className="flex flex-col items-center gap-1">
             <FaUser className="text-3xl" />
             Admin Dashboard
           </Link>
            </h2>

          <nav className="flex flex-col gap-4">
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `text-lg font-medium transition ${
                  isActive
                    ? darkMode
                      ? 'text-blue-400 bg-gray-700'
                      : 'text-violet-600 bg-gray-200'
                    : darkMode
                    ? 'text-gray-300 hover:text-blue-400'
                    : 'text-gray-700 hover:text-violet-600'
                } px-3 py-2 rounded-lg`
              }
            >
              USERS
            </NavLink>
            <NavLink
              to="/admin/blogs"
              className={({ isActive }) =>
                `text-lg font-medium transition ${
                  isActive
                    ? darkMode
                      ? 'text-blue-400 bg-gray-700'
                      : 'text-violet-600 bg-gray-200'
                    : darkMode
                    ? 'text-gray-300 hover:text-blue-400'
                    : 'text-gray-700 hover:text-violet-600'
                } px-3 py-2 rounded-lg`
              }
            >
              BLOGS
            </NavLink>
            <NavLink
              to="/admin/comments"
              className={({ isActive }) =>
                `text-lg font-medium transition ${
                  isActive
                    ? darkMode
                      ? 'text-blue-400 bg-gray-700'
                      : 'text-violet-600 bg-gray-200'
                    : darkMode
                    ? 'text-gray-300 hover:text-blue-400'
                    : 'text-gray-700 hover:text-violet-600'
                } px-3 py-2 rounded-lg`
              }
            >
              COMMENTS
            </NavLink>
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={toggleDarkMode}
            className={`w-full py-2 rounded-lg transition flex items-center justify-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-600'}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <Link to='/login'><button className={`w-full py-2 rounded-lg transition ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-violet-600 hover:bg-violet-700 text-white'}`}>
            LOGOUT
          </button></Link>
        </div>
      </div>

      {/* Overlay on mobile */}
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
