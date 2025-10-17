import express from "express";
import { signup, login } from "../controllers/authController.js";
import { createBlog, getBlogs } from "../controllers/blogController.js";


const router = express.Router();

// Signup route
router.route('/signup').post(signup);

// Login route
router.route('/login').post(login);

// Blog routes
router.route('/blogs').post(createBlog).get(getBlogs);

export default router;
