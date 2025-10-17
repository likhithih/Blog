import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Web', 'AI', 'Fullstack', 'Testing', 'Other']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Optional for anonymous blogs
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
