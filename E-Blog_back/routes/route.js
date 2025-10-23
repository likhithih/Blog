import express from "express";
import { signup, login, getAllUsers, deleteUser, updateProfile } from "../controllers/authController.js";
import { createBlog, getBlogs, getBlogById, deleteBlog, updateBlog, upload } from "../controllers/blogController.js";
import { createComment, getCommentsByBlog, getAllComments, deleteComment } from "../controllers/commentController.js";
import authenticate from '../middleware/authenticate.js';
import authorizeAdmin from '../middleware/authorizeAdmin.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for profile picture uploads
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/profiles';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const profileUpload = multer({
    storage: profileStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login',login);

// Get all users (admin only)
router.get('/users', authenticate, authorizeAdmin, getAllUsers);
router.delete('/users/:id', authenticate, authorizeAdmin, deleteUser);
router.put('/users/profile', authenticate, profileUpload.single('profilePic'), updateProfile);


// Blog routes
router.route('/blogs').post(authenticate, upload.single('image'), createBlog).get(getBlogs);
router.route('/blogs/:id').get(getBlogById).delete(authenticate, authorizeAdmin, deleteBlog).put(authenticate, authorizeAdmin, updateBlog);


// Comment routes
router.route('/comments').post(authenticate, createComment);
router.get('/comments/all', authenticate, getAllComments);
router.route('/comments/:blogId').get(getCommentsByBlog);
router.delete('/comments/:id', authenticate, deleteComment);

export default router;
