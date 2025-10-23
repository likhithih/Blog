import express from "express";
import { signup, login, getAllUsers, deleteUser } from "../controllers/authController.js";
import { createBlog, getBlogs, getBlogById, deleteBlog, updateBlog, upload } from "../controllers/blogController.js";
import { createComment, getCommentsByBlog, getAllComments, deleteComment } from "../controllers/commentController.js";
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login',login);

// Get all users (admin only)
router.get('/users', authenticate, getAllUsers);
router.delete('/users/:id', authenticate, deleteUser);


// Blog routes
router.route('/blogs').post(upload.single('image'), createBlog).get(getBlogs);
router.route('/blogs/:id').get(getBlogById).delete(authenticate, deleteBlog).put(authenticate, updateBlog);


// Comment routes
router.route('/comments').post(createComment);
router.get('/comments/all', authenticate, getAllComments);
router.route('/comments/:blogId').get(getCommentsByBlog);
router.delete('/comments/:id', authenticate, deleteComment);

export default router;
