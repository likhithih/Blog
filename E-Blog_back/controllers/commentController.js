import Comment from '../models/Comment.js';
import Blog from '../models/Blog.js';

export const createComment = async (req, res) => {
    try {
        const { content, blogId } = req.body;
        const author = '68f210120e6b3f1f77866614'; // Hardcoded for testing

        const newComment = new Comment({
            content,
            author,
            blog: blogId
        });

        await newComment.save();

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
        const comments = await Comment.find({ blog: blogId }).populate('author', 'username email name').sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
