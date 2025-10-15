import logo from "../assets/LOGO_blog.png";

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

          <a href="#" className="text-gray-800 font-semibold hover:bg-gray-200 px-4 py-2 rounded">About</a>
          <a href="#" className="text-gray-800 font-semibold hover:bg-gray-200 px-4 py-2 rounded">Blogs</a>
          <a href="#" className="text-gray-800 font-semibold hover:bg-gray-200 px-4 py-2 rounded">Log in</a>
          <a href="#" className="text-gray-800 font-semibold hover:bg-gray-200 px-4 py-2 rounded">Sign up</a>
        </div>
      </nav>
    </header>
  );
};

export default Nav_bl;
