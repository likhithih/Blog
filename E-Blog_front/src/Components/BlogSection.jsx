import React, { useState } from "react";
import Navbar from "./Navbar";
const posts = [
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

const categories = ["All", "Web", "AI", "Fullstack", "Testing", "Marketing", "Sales", "Business"];

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isHovered, setIsHovered] = useState(false);

  const filteredPosts = selectedCategory === "All" ? posts : posts.filter(post => post.category === selectedCategory);

  return (
    <>
      <Navbar />
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-20 h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-r-xl p-4 shadow-lg transition-all duration-300 overflow-hidden ${isHovered ? 'w-64' : 'w-16'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h3 className={`text-xl font-bold mb-6 text-white flex items-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <span className="mr-2">📂</span> Categories
        </h3>
        <ul className="space-y-3">
          {categories.map((category, index) => {
            const icons = ["📚", "🌐", "🤖", "💻", "🧪", "📈", "💰", "🏢"];
            return (
              <li key={category}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full px-4 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${selectedCategory === category
                    ? "bg-indigo-500 text-white shadow-md"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                    }`}
                >
                  <div className={`flex items-center transition-all duration-300 ${isHovered ? 'justify-start' : 'justify-center'}`}>
                    <span className="text-lg">{icons[index]}</span>
                    <span className={`ml-3 transition-all duration-300 ${isHovered ? 'inline' : 'hidden'}`}>{category}</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Main Content */}
      <div className={`bg-[#d8e2e4] text-white py-16 px-6 mt-4 transition-all duration-300 ${isHovered ? 'ml-64' : 'ml-0'}`}>
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
                key={post.id}
                className="bg-[#1e293b] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
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
                  </div>
                  <h3 className="text-lg font-semibold mb-2 hover:text-indigo-400 cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    {post.description.slice(0, 120)}...
                  </p>
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
