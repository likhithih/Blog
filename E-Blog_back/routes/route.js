import express from "express";
import { signup, login } from "../controllers/authController.js";
import { createBlog, getBlogs } from "../controllers/blogController.js";
import authenticate from '../middleware/authenticate.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure Multer for image storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), '../E-Blog_front/public/images'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'blog-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login',login);

// Blog routes
router.route('/blogs').post(createBlog).get(getBlogs);

export default router;
