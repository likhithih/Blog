import React from "react";
import { useTheme } from '../contexts/ThemeContext';

const categories = ["All", "Web", "AI", "Fullstack", "Testing"];

const Sidebar = ({ isHovered, setIsHovered, selectedCategory, setSelectedCategory }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`fixed left-0 top-16 h-svh ${darkMode ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-gray-100 to-gray-200'} p-4 shadow-lg transition-all duration-300 overflow-hidden ${
        isHovered ? "w-64" : "w-16"
      }`}
      onMouseOver={()=>setIsHovered(true)}
      onMouseLeave={()=>setIsHovered(false)}
    //   onClick={() => setIsHovered(!isHovered)}
    >
      <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
        {isHovered ? (
          <>
            <span className="mr-2">📂</span> Categories
          </>
        ) : (
          <span className="ml-2">☰</span>
        )}
      </h3>
      <ul className="space-y-3">
        {categories.map((category, index) => {
          const icons = ["📚", "🌐", "🤖", "💻", "🧪"];
          return (
            <li key={category}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`w-full px-4 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-indigo-500 text-white shadow-md"
                    : `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'}`
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
  );
};

export default Sidebar;
