import logo from '../assets/Blog-logo-Nav.png';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
    <div className="bg-white">
      <header className="fixed inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 bg-gray-800">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 group">
              <span className="sr-only">E Blog</span>
              <img
                src={logo}
                alt=""
                className="h-15 w-30 logo-transition transition-transform duration-300 group-hover:scale-110 active:scale-95"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              command="show-modal"
              commandfor="mobile-menu"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:bg-gray-700 active:scale-95 transition"
            >
              <span className="sr-only">Open main menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-6">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link
              to="/home"
              className="text-sm/6 font-bold text-white hover:text-gray-300 hover:bg-gray-700 rounded-md px-2 py-1 transition duration-200 active:scale-95"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm/6 font-semibold text-white hover:text-gray-300 hover:bg-gray-700 rounded-md px-2 py-1 transition duration-200 active:scale-95"
            >
              About
            </Link>
            <Link
              to="/blog"
              className="text-sm/6 font-semibold text-white hover:text-gray-300 hover:bg-gray-700 rounded-md px-2 py-1 transition duration-200 active:scale-95"
            >
              Blogs
            </Link>
            <Link
              to="/create"
              className="text-sm/6 font-semibold text-white hover:text-gray-300 hover:bg-gray-700 rounded-md px-2 py-1 transition duration-200 active:scale-95"
            >
              Create Blog
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            {user && (
              <img
                src={user.profileImage}
                alt="Profile"
                className="h-8 w-8 rounded-full cursor-pointer hover:ring-2 hover:ring-purple-500 hover:bg-purple-600/20 active:scale-95 transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
              />
            )}
          
          </div>
        </nav>

        <dialog id="mobile-menu" className="backdrop:bg-transparent lg:hidden">
          <div tabIndex="0" className="fixed inset-0 focus:outline-none">
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" className="h-8 w-auto" />
                </a>
                <button type="button" command="close" commandfor="mobile-menu" className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-gray-900 active:scale-95 transition">
                  <span className="sr-only">Close menu</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-6">
                    <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-200 hover:text-gray-900 transition duration-200 active:scale-95">About</a>
                    <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-200 hover:text-gray-900 transition duration-200 active:scale-95">Features</a>
                    <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-200 hover:text-gray-900 transition duration-200 active:scale-95">Marketplace</a>
                    <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-200 hover:text-gray-900 transition duration-200 active:scale-95">Company</a>
                  </div>
                  <div className="py-6">
                    <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-200 transition duration-200 active:scale-95">Log out</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Profile Box */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white/10 backdrop-blur-xl border-l border-white/20 shadow-2xl z-50 transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/20">
          <h2 className="text-white text-lg font-semibold">Profile</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white transition-transform duration-200 active:scale-95"
          >
            ✕
          </button>
        </div>

        <div className="p-6 text-center">
          <img
            src={user?.profileImage}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full border-4 border-purple-400 shadow-lg mb-4 hover:scale-105 hover:bg-purple-100 transition-all duration-300 active:scale-95"
          />
          <h2 className="text-2xl font-semibold text-white mb-1">{user?.name || "User"}</h2>
          <p className="text-purple-200 font-medium mb-1">{user?.jobTitle || "UI/UX Designer & Developer"}</p>
          <p className="text-white/70 mb-6">Gender: {user?.gender || "Male"}</p>
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 shadow-lg transition-all duration-300 active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
