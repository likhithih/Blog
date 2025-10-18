import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const categories = ["All", "Web", "AI", "Fullstack", "Testing", "Marketing", "Sales", "Business"];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Like toggle function
  const handleLikeToggle = async (blogId) => {
    if (!user) {
      toast.error("Please login to like blogs");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Optimistic UI update
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => {
          if (blog._id === blogId) {
            const likesArray = blog.likes || [];
            const isLiked = likesArray.includes(user._id);
            const updatedLikes = isLiked
              ? likesArray.filter((id) => id !== user._id)
              : [...likesArray, user._id];

            return { ...blog, likes: updatedLikes, likesCount: updatedLikes.length };
          }
          return blog;
        })
      );

      // Send like request to backend
      await axios.post(
        `http://localhost:4000/blogs/${blogId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Failed to toggle like");
    }
  };

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
          likesCount: blog.likes?.length || 0,
          likes: blog.likes || [],
          author: {
            name: blog.author?.name || "Anonymous",
            role: blog.author?.role || "Author",
            image:
              blog.author?.image ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          },
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

  if (loading) return <p className="text-center mt-20 text-gray-600">Loading blogs...</p>;

  return (
    <>
      <Navbar />

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-27 h-full bg-gradient-to-b from-gray-800 to-gray-900 p-4 shadow-lg transition-all duration-300 overflow-hidden ${
          isHovered ? "w-64" : "w-16"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h3
          className={`text-xl font-bold mb-6 text-white flex items-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="mr-2">📂</span> Categories
        </h3>
        <ul className="space-y-3">
          {categories.map((category, index) => {
            const icons = ["📚", "🌐", "🤖", "💻", "🧪", "📈", "💰", "🏢"];
            return (
              <li key={category}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full px-4 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? "bg-indigo-500 text-white shadow-md"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                  }`}
                >
                  <div
                    className={`flex items-center transition-all duration-300 ${
                      isHovered ? "justify-start" : "justify-center"
                    }`}
                  >
                    <span className="text-lg">{icons[index]}</span>
                    <span
                      className={`ml-3 transition-all duration-300 ${
                        isHovered ? "inline" : "hidden"
                      }`}
                    >
                      {category}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`bg-[#d8e2e4] text-white py-16 px-6 mt-4 transition-all duration-300 ${
          isHovered ? "ml-64" : "ml-16"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 mt-8">
            <h2 className="text-4xl font-bold mb-2 text-black">From the blog</h2>
            <p className="text-gray-800">
              Learn how to grow your business with our expert advice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className="bg-[#1e293b] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                onDoubleClick={() => handleLikeToggle(post._id)}
              >
                <img
                  src={post.image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-3 text-sm text-gray-400 mb-3">
                    <span>{post.date}</span>
                    <span className="bg-[#334155] px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                    <span className="text-xs">💬 {post.comments?.length || 0}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeToggle(post._id);
                      }}
                      className={`text-xs flex items-center gap-1 transition-colors ${
                        user && post.likes.includes(user._id)
                          ? "text-red-500"
                          : "text-gray-400 hover:text-red-400"
                      }`}
                    >
                      {user && post.likes.includes(user._id) ? "❤️" : "🤍"} {post.likesCount}
                    </button>
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
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{post.author.name}</p>
                      <p className="text-sm text-gray-400">{post.author.role}</p>
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
