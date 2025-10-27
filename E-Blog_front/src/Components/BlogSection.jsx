import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import author from '../assets/Logos/author.png';
import { useTheme } from "../contexts/ThemeContext";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export default function BlogSection() {
  const { darkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();



  // Fetch blogs and user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/blogs");
        const formattedBlogs = response.data.blogs.map((blog) => ({
          ...blog,
          date: formatDate(blog.createdAt),
          author: blog.author
        }));
        setBlogs(formattedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);



  const filteredPosts =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((post) => post.category === selectedCategory);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
    </div>
  );

  return (
    <>
      <Navbar />

      <Sidebar
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Content */}
      <div
        className={`${darkMode ? 'bg-gray-900' : 'bg-white'} text-white pt-25 pb-20 px-6 transition-all duration-300 ${isHovered ? "ml-64" : "ml-16"}`}
       >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 ">
            <h2 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>From the blog</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              Learn how to grow your business with our expert advice.
            </p>
          </div>

          <div className={`grid gap-10 ${isHovered ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}

              >
                <img
                  src={post.image ? `http://localhost:4000/uploads/${post.image}` : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className={`flex items-center justify-between text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                    <div className="flex items-center space-x-3">
                      <span>{post.date}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-[18px]">💬 {post.comments?.length || 0}</span>
                    </div>
                  </div>
                  <h3
                    className={`text-lg font-semibold mb-2 hover:text-indigo-400 cursor-pointer ${darkMode ? 'text-white' : 'text-gray-900'}`}
                    onClick={() => navigate(`/blog/${post._id}`)}
                  >
                    {post.title}
                  </h3>
                  <p
                    className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-6`}
                    dangerouslySetInnerHTML={{
                      __html:
                        post.description.length > 120
                          ? post.description.slice(0, 120) + "..."
                          : post.description,
                    }}
                  />
                  <div className="flex items-center space-x-3">
                    <img
                      src={author}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{post.author}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>MERN developer</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
