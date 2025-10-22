import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { FiUpload } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const CreateBlog = () => {
    const { darkMode } = useTheme();
    const [formData, setFormData] = useState({
        title: '',
        category: 'Web',
        description: ''
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('description', formData.description);
            if (image) {
                formDataToSend.append('image', image);
            }

            const response = await axios.post('http://localhost:4000/blogs', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                toast.success('Blog created successfully!');
                // Navigate to blog page
                navigate('/blog');
                // Reset form
                setFormData({
                    title: '',
                    category: 'Web',
                    description: ''
                });
                setImage(null);
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message || 'Failed to create blog';
                toast.error(errorMessage);
            } else {
                toast.error('Network error. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className={`max-w-4xl mx-auto p-6 mt-30 mb-30 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create New Blog</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
                            placeholder="Enter blog title"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
                        >
                            <option value="Web">Web</option>
                            <option value="AI">AI</option>
                            <option value="Fullstack">Fullstack</option>
                            <option value="Testing">Testing</option>
                            {/* <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="Business">Business</option> */}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="image" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Image
                        </label>
                        <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 transition-colors ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onClick={() => document.getElementById('image').click()}
                        >
                            {image ? (
                                <div className="flex flex-col items-center">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Preview"
                                        className="max-w-full max-h-48 object-cover rounded-lg mb-2"
                                    />
                                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{image.name}</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <FiUpload className={`text-4xl mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Drag and drop an image here, or click to select</p>
                                    <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Supported formats: JPG, PNG, GIF</p>
                                </div>
                            )}
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Description
                        </label>
                        <Editor
                            apiKey="bq9avf204fn63uuywobbss1q11enpyjqqi2x4k1fp6xhmsff" // Replace with your TinyMCE API key
                            value={formData.description}
                            onEditorChange={(content) => setFormData({ ...formData, description: content })}
                            initialValue="<p>This is the initial content of the editor.</p>"
                            init={{
                                height: 300,
                                menubar: true,
                                forced_root_block: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                            }}
                        />
                        {/* <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter blog description"
                            rows="10"
                            required
                        /> */}
                    </div>

                    <center>


                        <button
                            type="submit"
                            // disabled={loading}
                            className="w-50 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Creating...' : 'Create Blog'}
                        </button>
                    </center>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default CreateBlog;
