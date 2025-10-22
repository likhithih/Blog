import { Link } from "react-router-dom";
import logo from "../assets/Blog-logo-Nav.png";
import { useTheme } from "../contexts/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const Nav_bl = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className={`${darkMode ? 'bg-gray-900/80' : 'bg-white/0'} backdrop-blur-md fixed w-full z-50 shadow-md transition-colors duration-300`}>

      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center h-16">
        {/* Logo at the far left */}
        <Link to='/' className="flex-1">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Links and auth spaced evenly */}
        <div className="flex-1 flex justify-around items-center ml-6 bg-white/0 rounded-md px-4 py-2">
          <Link to={'/about'} className={`${darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'} font-semibold px-4 py-2 rounded transition-colors`}>About</Link>
          <Link to="/login" className=" bg-indigo-700 text-white font-semibold border border-indigo-600 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded transition-colors">Log in</Link>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors duration-200 ${darkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Nav_bl;
