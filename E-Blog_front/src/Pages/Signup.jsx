import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useTheme } from '../contexts/ThemeContext';
import signup from '../assets/signup.png';

export default function Signup() {
    const { darkMode } = useTheme();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [usernameError, setUsernameError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (e.target.name === 'username') {
            setUsernameError('');
        }
    };


    const generateErrorToast = (err) => {
        toast.error(err)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.username.length < 3) {
            setUsernameError('Username must have more than 3 characters');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/signup', formData);

            if (response.status === 201) {
                toast.success('User created successfully!');
                // Redirect to home or dashboard
                setTimeout(() => { navigate('/home') }, 2000)
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message || 'Signup failed';
                generateErrorToast(errorMessage);
            } else {
                const networkError = 'Network error. Please try again.';
                generateErrorToast(networkError);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`flex h-screen w-full ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>

            {/* LEFT SIDE IMAGE */}
            <div className="w-full hidden md:flex md:items-center md:justify-center relative">
                <img
                    className="h-145 w-full object-contain relative left-3 top-1"
                    src={signup}
                    alt="leftSideImage"
                />
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="w-full flex flex-col items-center justify-center">
                <form onSubmit={handleSubmit} className="md:w-96 w-80 flex flex-col items-center justify-center">
                    <h2 className={`text-4xl font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Signup</h2>
                    <p className={`text-sm mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-500/90'}`}>Create your account! Please sign up to continue</p>


                    <div className={`flex items-center w-full bg-transparent border h-12 rounded-full overflow-hidden pl-6 gap-2 mt-8 ${darkMode ? 'border-gray-600' : 'border-gray-300/60'}`}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 1c-1.33 0-4 1.34-4 2v1h8v-1c0-.66-2.67-2-4-2z" fill={darkMode ? '#9CA3AF' : '#6B7280'} />
                        </svg>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`bg-transparent outline-none text-sm w-full h-full ${darkMode ? 'text-gray-300 placeholder-gray-400' : 'text-gray-500/80 placeholder-gray-500/80'}`}
                            required
                        />
                    </div>
                    {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}

                    <div className={`flex items-center w-full bg-transparent border h-12 rounded-full overflow-hidden pl-6 gap-2 mt-6 ${darkMode ? 'border-gray-600' : 'border-gray-300/60'}`}>
                        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill={darkMode ? '#9CA3AF' : '#6B7280'} />
                        </svg>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email id"
                            value={formData.email}
                            onChange={handleChange}
                            className={`bg-transparent outline-none text-sm w-full h-full ${darkMode ? 'text-gray-300 placeholder-gray-400' : 'text-gray-500/80 placeholder-gray-500/80'}`}
                            required
                        />
                    </div>

                    <div className={`flex items-center mt-6 w-full bg-transparent border h-12 rounded-full overflow-hidden pl-6 gap-2 ${darkMode ? 'border-gray-600' : 'border-gray-300/60'}`}>
                        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill={darkMode ? '#9CA3AF' : '#6B7280'} />
                        </svg>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`bg-transparent outline-none text-sm w-full h-full ${darkMode ? 'text-gray-300 placeholder-gray-400' : 'text-gray-500/80 placeholder-gray-500/80'}`}
                            required
                        />
                    </div>

                    <div className={`flex items-center mt-6 w-full bg-transparent border h-12 rounded-full overflow-hidden pl-6 gap-2 ${darkMode ? 'border-gray-600' : 'border-gray-300/60'}`}>
                        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill={darkMode ? '#9CA3AF' : '#6B7280'} />
                        </svg>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`bg-transparent outline-none text-sm w-full h-full ${darkMode ? 'text-gray-300 placeholder-gray-400' : 'text-gray-500/80 placeholder-gray-500/80'}`}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-8 w-96 h-12 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {loading ? 'Signing up...' : 'Signup'}
                    </button>

                    <p className={`text-sm mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-500/90'}`}>
                        Already have an account? <Link to="/login" className={`hover:underline ${darkMode ? 'text-indigo-400' : 'text-indigo-500'}`}>Login</Link>
                    </p>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}
