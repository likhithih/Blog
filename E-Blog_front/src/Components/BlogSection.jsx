import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const hardcodedPosts = [
  {
    id: 1,
    date: "Mar 16, 2020",
    category: "Marketing",
    title: "Boost your conversion rate",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde.",
    image:
      "https://images.unsplash.com/photo-1527856263669-12c3a0af2aa6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      image:
        "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: 2,
    date: "Mar 10, 2020",
    category: "Sales",
    title: "How to use search engine optimization to drive sales",
    description:
      "Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Lindsay Walton",
      role: "Front-end Developer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: 3,
    date: "Feb 12, 2020",
    category: "Business",
    title: "Improve your customer experience",
    description:
      "Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Tom Cook",
      role: "Director of Product",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const stripHtml = (html) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const categories = ["All", "Web", "AI", "Fullstack", "Testing", "Marketing", "Sales", "Business"];

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLikeToggle = async (blogId) => {
    if (!user) {
      toast.error('Please login to like blogs');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:4000/blogs/${blogId}/like`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setBlogs(prevBlogs =>
        prevBlogs.map(blog =>
          blog._id === blogId
            ? { ...blog, likes: response.data.likes }
            : blog
        )
      );
      toast.success(response.data.isLiked ? 'Blog liked!' : 'Blog unliked!');
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to toggle like');
    }
  };

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Combine hardcoded posts with fetched blogs
  const allPosts = [
    ...blogs.map(blog => ({
      id: blog._id,
      date: formatDate(blog.createdAt),
      category: blog.category,
      title: blog.title,
      description: blog.description,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      author: {
        name: user?.name || blog.author?.name || 'Anonymous',
        role: user?.role || blog.author?.role || 'Author',
        image: user?.image || blog.author?.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      commentsCount: blog.comments?.length || 0,
      likesCount: blog.likes?.length || 0,
    })),
    ...hardcodedPosts
  ];

  const filteredPosts = selectedCategory === "All" ? allPosts : allPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <Navbar />
      <div className="bg-[#d8e2e4] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto flex">
          {/* Sidebar */}
        <div className="w-1/4 pr-6 -ml-10">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg sticky top-6">
              <h3 className="text-xl font-bold mb-6 text-white flex items-center">
                <span className="mr-2">📂</span> Categories
              </h3>
              <ul className="space-y-3">
                {categories.map((category, index) => {
                  const icons = ["📚", "🌐", "🤖", "💻", "🧪", "📈", "💰", "🏢"];
                  return (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`flex items-center w-full text-left px-4 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${selectedCategory === category
                          ? "bg-indigo-500 text-white shadow-md"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                          }`}
                      >
                        <span className="mr-3 text-lg">{icons[index]}</span>
                        {category}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-3/4">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-2 text-black">From the blog</h2>
              <p className="text-gray-800">
                Learn how to grow your business with our expert advice.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#1e293b] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  onDoubleClick={() => handleLikeToggle(post.id)}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-3 text-sm text-gray-400 mb-3">
                      <span>{post.date}</span>
                      <span className="bg-[#334155] px-3 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                      <span className="text-xs">💬 {post.commentsCount || 0}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLikeToggle(post.id);
                        }}
                        className={`text-xs flex items-center gap-1 transition-colors ${
                          user && post.likes?.includes(user._id) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                        }`}
                      >
                        {user && post.likes?.includes(user._id) ? '❤️' : '🤍'} {post.likesCount || 0}
                      </button>
                    </div>
                    <h3
                      className="text-lg font-semibold mb-2 hover:text-indigo-400 cursor-pointer"
                      onClick={() => navigate(`/blog/${post.id}`)}
                    >
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6" dangerouslySetInnerHTML={{ __html: post.description.length > 120 ? post.description.slice(0, 120) + '...' : post.description }} />
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
      </div>
      
    </>
  );
}
