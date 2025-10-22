import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Sidebar({ darkMode = false }) {
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
          <h2 className={`text-2xl font-bold mb-6 pt-13 ${darkMode ? 'text-blue-400' : 'text-violet-700'}`}>
           <Link to="/admin">Admin Dashboard</Link>
            </h2>

          <nav className="flex flex-col gap-4">
            <Link
              to="/admin/users"
              className={`text-lg font-medium transition ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-violet-600'}`}
            >
              USERS
            </Link>
            <Link
              to="/admin/blogs"
              className={`text-lg font-medium transition ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-violet-600'}`}
            >
              BLOGS
            </Link>
            <Link
              to="/admin/comments"
              className={`text-lg font-medium transition ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-violet-600'}`}
            >
              COMMENTS
            </Link>
          </nav>
        </div>

        <div>
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
