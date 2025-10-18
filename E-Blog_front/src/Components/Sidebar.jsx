import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Show sidebar only on admin pages
  if (!location.pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* Hamburger button always visible */}
      <button
        className="text-3xl p-3 fixed top-4 left-4 z-60 text-gray-700 hover:text-violet-600 transition"
        onClick={() => setOpen(!open)}
      >
        <GiHamburgerMenu />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 z-50
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div>
          <h2 className="text-2xl font-bold mb-6 pt-13 text-violet-700">Admin Dashboard</h2>

          <nav className="flex flex-col gap-4">
            <Link
              to="/admin/users"
              className="text-lg font-medium text-gray-700 hover:text-violet-600 transition"
            >
              USERS
            </Link>
            <Link
              to="/admin/blogs"
              className="text-lg font-medium text-gray-700 hover:text-violet-600 transition"
            >
              BLOGS
            </Link>
            <Link
              to="/admin/comments"
              className="text-lg font-medium text-gray-700 hover:text-violet-600 transition"
            >
              COMMENTS
            </Link>
          </nav>
        </div>

        <div>
          <Link to='/login'><button className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition">
            LOGOUT
          </button></Link>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
