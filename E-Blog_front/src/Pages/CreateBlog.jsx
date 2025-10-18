import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Web',
        // image: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    // const [draggedImage, setDraggedImage] = useState(null);
    // const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // const handleDragOver = (e) => {
    //     e.preventDefault();
    // };

    // const handleDrop = (e) => {
    //     e.preventDefault();
    //     const files = e.dataTransfer.files;
    //     if (files.length > 0) {
    //         const file = files[0];
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             setFormData({ ...formData, image: reader.result });
    //             setDraggedImage(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     } else {
    //         toast.error('Please drop a valid image file.');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:4000/blogs', {
                title: formData.title,
                category: formData.category,
                description: formData.description
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                toast.success('Blog created successfully!');
                // Reset form
                setFormData({
                    title: '',
                    category: 'Web',
                    // image: '',
                    description: ''
                });
                // setDraggedImage(null);
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
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Blog</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter blog title"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="Web">Web</option>
                        <option value="AI">AI</option>
                        <option value="Fullstack">Fullstack</option>
                        <option value="Testing">Testing</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Business">Business</option>
                    </select>
                </div>

                {/* <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                        Image
                    </label>
                    <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current.click()}
                        className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors"
                    >
                        {draggedImage ? (
                            <img src={draggedImage} alt="Dragged" className="max-h-full max-w-full object-cover rounded" />
                        ) : (
                            <p className="text-gray-500">Drag and drop an image here or click to select</p>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file && file.type.startsWith('image/')) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    setFormData({ ...formData, image: reader.result });
                                    setDraggedImage(reader.result);
                                };
                                reader.readAsDataURL(file);
                            } else {
                                toast.error('Please select a valid image file.');
                            }
                        }}
                        accept="image/*"
                        className="hidden"
                    />
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Or enter image URL"
                        required
                    />
                </div> */}

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter a short description"
                        required
                    />
                </div>



                <button
                    type="submit"
                    // disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Creating...' : 'Create Blog'}
                </button>
            </form>
        </div>
    );
};

export default CreateBlog;
