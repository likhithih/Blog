import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Web', 'AI', 'Fullstack', 'Testing', 'Marketing', 'Sales', 'Business']
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],

    image: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
