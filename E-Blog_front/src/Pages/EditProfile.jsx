import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaUser, FaEnvelope, FaBriefcase, FaCamera, FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const EditProfile = () => {
    const { darkMode } = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        jobTitle: '',
        profilePic: null
    });
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setFormData({
                username: userData.username || '',
                email: userData.email || '',
                jobTitle: userData.jobTitle || '',
                profilePic: userData.profilePic || null
            });
            setPreviewImage(userData.profilePic || 'https://avatars.githubusercontent.com/u/124576166?v=4');
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error('Image size should be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
                setFormData(prev => ({
                    ...prev,
                    profilePic: file
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const submitData = new FormData();

            submitData.append('username', formData.username);
            submitData.append('email', formData.email);
            submitData.append('jobTitle', formData.jobTitle);

            if (formData.profilePic && typeof formData.profilePic !== 'string') {
                submitData.append('profilePic', formData.profilePic);
            }

            const response = await axios.put('http://localhost:4000/users/profile', submitData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                // Update local storage with new user data
                const updatedUser = { ...user, ...response.data.user };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);

                toast.success('Profile updated successfully!');
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            const errorMessage = error.response?.data?.message || 'Failed to update profile';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Header */}
            <div className={`shadow-sm border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate('/home')}
                                className={`p-2 rounded-lg transition-colors duration-200 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            >
                                <FaArrowLeft size={20} />
                            </button>
                            <h1 className="text-2xl font-bold">Edit Profile</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className={`rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <form onSubmit={handleSubmit} className="p-8">
                        {/* Profile Picture Section */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative mb-4">
                                <img
                                    src={previewImage}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-xl object-cover"
                                />
                                <label
                                    htmlFor="profilePic"
                                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors duration-200 cursor-pointer shadow-lg"
                                >
                                    <FaCamera size={16} />
                                </label>
                                <input
                                    type="file"
                                    id="profilePic"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Click the camera icon to change your profile picture
                            </p>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-6">
                            {/* Username */}
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <FaUser className="inline mr-2" />
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                                        darkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                                    }`}
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <FaEnvelope className="inline mr-2" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                                        darkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                                    }`}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            {/* Job Title */}
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <FaBriefcase className="inline mr-2" />
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                                        darkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                                    }`}
                                    placeholder="Enter your job title"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4 mt-8">
                            <button
                                type="button"
                                onClick={() => navigate('/home')}
                                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                                    darkMode
                                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                }`}
                            >
                                <FaTimes className="inline mr-2" />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    <>
                                        <FaSave className="mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={darkMode ? 'dark' : 'light'}
            />
        </div>
    );
};

export default EditProfile;
