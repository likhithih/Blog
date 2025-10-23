import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FaUser, FaEnvelope, FaBriefcase, FaEdit, FaSignOutAlt, FaTimes } from 'react-icons/fa';

const ProfileSidebar = ({ isOpen, setIsOpen, user, handleLogout }) => {
    const { darkMode } = useTheme();
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar Profile Box */}
            <div
                className={`fixed top-0 right-0 w-80 h-full ${darkMode
                    ? 'bg-gradient-to-b from-slate-900 to-slate-800 border-slate-700'
                    : 'bg-gradient-to-b from-white to-slate-50 border-slate-200'
                    } border-l shadow-2xl z-50 transform transition-all duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className={`flex justify-between items-center px-6 py-5 border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                    <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        My Profile
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* Profile Content */}
                <div className="p-6 flex flex-col items-center">
                    {/* Profile Image */}
                    <div className="relative mb-6">
                        <img
                            src={user?.profilePic || 'https://avatars.githubusercontent.com/u/124576166?v=4'}
                            alt="Profile"
                            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-xl hover:scale-105 transition-all duration-300"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                        <button
                            onClick={() => {
                                // Handle profile picture change
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = 'image/*';
                                input.onchange = (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        // Handle file upload logic here
                                        console.log('Selected file:', file);
                                        // You would typically upload to server and update user state
                                    }
                                };
                                input.click();
                            }}
                            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200 shadow-lg"
                        >
                            <FaEdit size={12} />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="w-full space-y-4">
                        <div className="text-center">
                            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                                {user?.username || "User"}
                            </h3>
                            <div className={`flex items-center justify-center gap-2 text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                <FaBriefcase size={14} />
                                <span>{user?.jobTitle || "MERN Stack Developer"}</span>
                            </div>
                        </div>

                        <div className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                            <FaEnvelope className={`text-blue-500`} size={16} />
                            <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                {user?.email}
                            </span>
                        </div>

                        <div className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                            <FaUser className={`text-green-500`} size={16} />
                            <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                {user?.role === 'admin' ? 'Administrator' : 'Regular User'}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full mt-8 space-y-3">
                        <button
                            onClick={() => {
                                // Handle edit profile logic here
                                setIsOpen(false);
                                window.location.href = '/edit-profile';
                            }}
                            className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg ${
                                darkMode
                                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                                    : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                            }`}
                        >
                            <FaEdit size={16} />
                            Edit Profile
                        </button>

                        <button
                            onClick={() => {
                                setIsOpen(false);
                                handleLogout();
                            }}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-700 shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            <FaSignOutAlt size={16} />
                            Logout
                        </button>
                    </div>

                    {/* Footer */}
                    <div className={`mt-8 text-center text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        <p>E-Blog Platform</p>
                        <p>Version 1.0.0</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileSidebar;
