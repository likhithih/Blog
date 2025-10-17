import React, { useEffect, useState } from "react";

const HeroSection = () => {
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
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-gray-900 opacity-0 animate-fadeSlide">
            {text}
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-gray-500 opacity-0 animate-fadeSlide delay-200">
            A blog built for curious minds uncovering the trends, tools, and technologies shaping tomorrow’s digital world.
          </p>

          <div className="mt-8 flex justify-center gap-4 opacity-0 animate-fadeSlide delay-400">
            <a
              href="#"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Create Blog
            </a>
            <a
              href="#"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
            >
              Learn More
            </a>
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
