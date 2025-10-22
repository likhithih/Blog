import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "./Footer";
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
        const formattedBlogs = response.data.map((blog) => ({
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
        className={`${darkMode ? 'bg-gray-900' : 'bg-[#d8e2e4]'} text-white pt-30 pb-20 px-6 transition-all duration-300 ${isHovered ? "ml-64" : "ml-16"}`}
       >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 mt-8">
            <h2 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>From the blog</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              Learn how to grow your business with our expert advice.
            </p>
          </div>

          <div className={`grid gap-10 ${isHovered ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className={`${darkMode ? 'bg-gray-800' : 'bg-[#1e293b]'} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300`}

              >
                <img
                  src={post.image ? `http://localhost:4000/uploads/${post.image}` : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <div className="flex items-center space-x-3">
                      <span>{post.date}</span>
                      <span className="bg-[#334155] px-3 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-[18px]">💬 {post.comments?.length || 0}</span>
                    </div>
                  </div>
                  <h3
                    className="text-lg font-semibold mb-2 hover:text-indigo-400 cursor-pointer"
                    onClick={() => navigate(`/blog/${post._id}`)}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-gray-400 text-sm mb-6"
                    dangerouslySetInnerHTML={{
                      __html:
                        post.description.length > 120
                          ? post.description.slice(0, 120) + "..."
                          : post.description,
                    }}
                  />
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{post.author}</p>
                      <p className="text-sm text-gray-400">MERN developer</p>
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
