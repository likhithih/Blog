import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ProfileSidebar = ({ isOpen, setIsOpen, user, handleLogout }) => {
    const { darkMode } = useTheme();
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar Profile Box */}
            <div
                className={`fixed top-0 right-0 h-full w-80 ${
                    darkMode
                        ? 'bg-gray-900/20 backdrop-blur-md border-gray-700/50'
                        : 'bg-white/20 backdrop-blur-md border-gray-200/50'
                } border-l shadow-2xl z-50 transform transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className={`flex justify-between items-center px-6 py-4 border-b ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                    <h2 className={`text-lg font-semibold ${
                        darkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>Profile</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className={`transition-transform duration-200 active:scale-95 ${
                            darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 text-center bg-black/80 backdrop-blur-500">
                    <img
                        src='https://avatars.githubusercontent.com/u/124576166?v=4'
                        alt="Profile"
                        className="w-24 h-24 mx-auto rounded-full border-4 border-purple-400 shadow-lg mb-4 hover:scale-105 transition-all duration-300 active:scale-95"
                    />
                    <h2 className={`text-2xl font-semibold mb-1 ${
                        darkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>{user?.username || "User"}</h2>
                    <p className="text-purple-400 font-medium mb-1">{user?.jobTitle || "MERN engineer"}</p>
                    <p className={`${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{user?.email}</p>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            handleLogout();
                        }}
                        className="w-full py-3 mt-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 shadow-lg transition-all duration-300 active:scale-95"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProfileSidebar;
