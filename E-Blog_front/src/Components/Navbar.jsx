import logo from '../assets/Blog-logo-Nav.png';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import { useTheme } from '../contexts/ThemeContext';
import { FaMoon, FaSun, FaBars, FaTimes, FaHome, FaInfo, FaBlog, FaPlus, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className={`fixed inset-x-0 top-0 z-50 ${darkMode ? 'bg-gray-900/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/home" className="flex items-center group">
              <img
                src={logo}
                alt="E Blog"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isActive
                    ? 'bg-lime-400 text-white shadow-lg shadow-lime-400/30'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-lime-400'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-lime-400'
                }`
              }
            >
              <FaHome size={16} />
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isActive
                    ? 'bg-lime-400 text-white shadow-lg shadow-lime-400/30'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-lime-400'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-lime-400'
                }`
              }
            >
              <FaInfo size={16} />
              About
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isActive
                    ? 'bg-lime-400 text-white shadow-lg shadow-lime-400/30'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-lime-400'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-lime-400'
                }`
              }
            >
              <FaBlog size={16} />
              Blogs
            </NavLink>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isActive
                    ? 'bg-lime-400 text-white shadow-lg shadow-lime-400/30'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-lime-400'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-lime-400'
                }`
              }
            >
              <FaPlus size={16} />
              Create Blog
            </NavLink>
          </div>

          {/* Right side: Theme toggle and Profile */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
                darkMode
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600 hover:shadow-yellow-400/20'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-gray-400/20'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
            {user && (
              <div className="relative">
                <img
                  src="https://avatars.githubusercontent.com/u/124576166?v=4"
                  alt="Profile"
                  className="h-10 w-10 rounded-full cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all duration-300 hover:scale-105 shadow-lg"
                  onClick={() => setIsOpen(!isOpen)}
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
            )}
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg ${
                darkMode
                  ? 'text-gray-300 hover:bg-gray-700 hover:shadow-gray-600/20'
                  : 'text-gray-700 hover:bg-gray-100 hover:shadow-gray-400/20'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t ${darkMode ? 'border-gray-700 bg-gray-900/95' : 'border-gray-200 bg-white/95'} backdrop-blur-md`}>
            <div className="px-2 pt-2 pb-3 space-y-2">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-base font-medium transition-all duration-300 hover:scale-105 rounded-lg ${
                    isActive
                      ? 'bg-lime-400 text-white shadow-lg shadow-lime-400/30'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-lime-400'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-lime-400'
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaHome size={18} />
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-base font-medium transition-all duration-300 hover:scale-105 rounded-lg ${
                    isActive
                      ? 'bg-lime-400 text-white shadow-lg shadow-lime-400/30'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-lime-400'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-lime-400'
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaInfo size={18} />
                About
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-base font-medium transition-all duration-300 hover:scale-105 rounded-lg ${
                    isActive
                      ? 'bg-lime-400 text-white shadow-lg shadow-lime-400/30'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-lime-400'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-lime-400'
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaBlog size={18} />
                Blogs
              </NavLink>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-base font-medium transition-all duration-300 hover:scale-105 rounded-lg ${
                    isActive
                      ? 'bg-lime-400 text-white shadow-lg shadow-lime-400/30'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-lime-400'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-lime-400'
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaPlus size={18} />
                Create Blog
              </NavLink>
            </div>
          </div>
        )}
      </header>

      <ProfileSidebar isOpen={isOpen} setIsOpen={setIsOpen} user={user} handleLogout={handleLogout} />
    </div>
  );
};

export default Navbar;
