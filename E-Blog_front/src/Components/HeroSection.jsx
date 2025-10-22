import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const HeroSection = () => {
  const { darkMode } = useTheme();
  const fullText = "Welcome to our world of words";
  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8 overflow-hidden">
        {/* Floating background shapes */}
        <div className="absolute top-[-10rem] left-1/2 w-[36rem] h-[36rem] bg-blue-200 opacity-20 rounded-full -translate-x-1/2 animate-pulse-slow blur-3xl"></div>
        <div className="absolute bottom-[-12rem] right-0 w-[28rem] h-[28rem] bg-pink-200 opacity-20 rounded-full animate-pulse-slow blur-3xl"></div>

        <div className="mx-auto max-w-2xl pt-2 pb-8 sm:mt-24 sm:pt-24 sm:pb-12 lg:mt-20 lg:pt-15 lg:pb-22 text-center">
          <h1 className={`text-5xl sm:text-7xl font-bold tracking-tight opacity-0 animate-fadeSlide ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {text}
          </h1>

          <p className={`mt-8 text-lg sm:text-xl opacity-0 animate-fadeSlide delay-200 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            A blog built for curious minds uncovering the trends, tools, and technologies shaping tomorrow’s digital world.
          </p>

          <div className="mt-8 flex justify-center gap-4 opacity-0 animate-fadeSlide delay-400">
            <Link
              to="/create"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Create Blog
            </Link>
            <Link
              to="/about"
              className={`px-6 py-3 border rounded-md transition ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            >
              Learn More
            </Link>
          </div>
        </div>

        <style>
          {`
          @keyframes fadeSlide {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeSlide { animation: fadeSlide 1s ease-out forwards; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-400 { animation-delay: 0.4s; }

          @keyframes pulse-slow {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-10px) scale(1.05); }
          }
          .animate-pulse-slow { animation: pulse-slow 10s ease-in-out infinite; }
        `}
        </style>
      </div>
    </>
  );
};

export default HeroSection;
