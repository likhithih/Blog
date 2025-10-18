import { Link } from "react-router-dom";
import logo from "../assets/Blog-logo-Nav.png";
import Dropdown from "./Dropdown";

const Nav_bl = () => {
  return (
    <header className="bg-white/0 backdrop-blur-md fixed w-full z-50 shadow-md">

      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center h-16">
        {/* Logo at the far left */}
        <a href="#" className="flex-1">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </a>

        {/* Links and auth spaced evenly */}
        <div className="flex-1 flex justify-around items-center ml-6 bg-white/0 rounded-md px-4 py-2">
          <Link to={'/about'} className="text-gray-800 font-semibold hover:bg-gray-200 px-4 py-2 rounded">About</Link>
          <Link to="/login" className=" bg-indigo-700 text-white font-semibold border border-indigo-600 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded transition-colors">Log in</Link>
          <Link to="/signup" className="bg-indigo-700 text-white font-semibold hover:bg-indigo-400 px-4 py-2 rounded transition-colors">Sign up</Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav_bl;
