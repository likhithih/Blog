import Comment from '../models/Comment.js';
import Blog from '../models/Blog.js';

export const createComment = async (req, res) => {
    try {
        const { content, blogId } = req.body;
        const author = req.user.id; // Use authenticated user ID

        const newComment = new Comment({
            content,
            author,
            blog: blogId
        });

        await newComment.save();

        // Populate the author before sending response
        await newComment.populate('author', 'username email');

        // Add comment to blog's comments array
        await Blog.findByIdAndUpdate(blogId, { $push: { comments: newComment._id } });

        res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getCommentsByBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await Comment.find({ blog: blogId }).populate('author', 'username email').sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('author', 'username email').populate('blog', 'title').sort({ createdAt: -1 });
        res.status(200).json({ comments, totalComments: comments.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        await Comment.findByIdAndDelete(id);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
