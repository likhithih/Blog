import Blog from '../models/Blog.js';
import User from '../models/User.js';

export const createBlog = async (req, res) => {
    try {
        const { title, category, image, description } = req.body;

        let imagePath = image || 'https://via.placeholder.com/300x200?text=No+Image';

        // If file was uploaded, use the uploaded file path
        // if (req.file) {
        //     imagePath = `/images/${req.file.filename}`;
        // }

        const newBlog = new Blog({
            title,
            category,
            image: imagePath,
            description,
            author: '68f210120e6b3f1f77866614' // Hardcoded for testing
        });

        await newBlog.save();

        res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username email name role image').sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
