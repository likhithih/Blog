import React, { useState } from "react";

const ProfileCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-3 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300"
      >
        <img
          src="https://avatars.githubusercontent.com/u/124576166?v=4"
          alt="Avatar"
          className="w-12 h-12 rounded-full border-2 border-white/60"
        />
        <span className="text-white font-medium">Open Profile</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Profile Box */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white/10 backdrop-blur-xl border-l border-white/20 shadow-2xl z-50 transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/20">
          <h2 className="text-white text-lg font-semibold">Profile</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-6 text-center">
          {/* Avatar */}
          <img
            src="https://avatars.githubusercontent.com/u/124576166?v=4"
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full border-4 border-purple-400 shadow-lg mb-4"
          />

          {/* Name */}
          <h2 className="text-2xl font-semibold text-white mb-1">
            Kuldeep Prajapati
          </h2>

          {/* Job Title */}
          <p className="text-purple-200 font-medium mb-1">
            UI/UX Designer & Developer
          </p>

          {/* Gender */}
          <p className="text-white/70 mb-6">Gender: Male</p>

          {/* Logout Button */}
          <button
            onClick={() => {
              setIsOpen(false);
              alert("You have been logged out!");
            }}
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 shadow-lg transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
