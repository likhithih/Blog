import React from "react";

export default function Signup() {
  return (
    <>
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <div className="max-w-md text-center">
          {/* SVG can be added here later */}
        </div>
      </div>

      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Sign Up
          </h1>
          <h2 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Join our community with all-time access for free
          </h2>

          <div className="mt-4 flex flex-col lg:flex-row items-center justify-between gap-2">
            <button className="w-full lg:w-1/2 flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
              Sign Up with Google
            </button>

            <button className="w-full lg:w-1/2 flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
              Sign Up with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}