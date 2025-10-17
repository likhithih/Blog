import Blog from '../models/Blog.js';
import User from '../models/User.js';

export const createBlog = async (req, res) => {
    try {
        const { title, content, category } = req.body;

        // No authentication required, allow anonymous blog creation
        const author = null; // No author for anonymous blogs

        const newBlog = new Blog({
            title,
            content,
            category,
            author
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
        const blogs = await Blog.find().populate('author', 'username email').sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
