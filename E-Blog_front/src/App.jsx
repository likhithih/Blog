import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './contexts/ThemeContext';
import CreateBlog from './Pages/CreateBlog'
import BlogSection from './Components/BlogSection'
import BlogPost from './Pages/BlogPost'
// import HeroSection from './Components/HeroSection'
import LandingBody from './Components/LandingBody'
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import PageNotFound from "./Pages/PageNotFound";
import Users from "./Admin/Users";
import Blog from "./Admin/Blog";
import Admin from "./Admin/Admin";
import Nav_bl from "./Components/Nav_bl";
import Comments from "./Admin/Comments";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>   
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<><Nav_bl /><LandingBody /></>} />

          {/* Main App Pages */}
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/blog" element={<BlogSection />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/about" element={<About status={isLoggedIn} toggle={setIsLoggedIn} />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />

          {/* Admin Pages */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/blogs" element={<Blog />} />
          <Route path="/admin/comments" element={<Comments />} />


          {/* 404 Page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
