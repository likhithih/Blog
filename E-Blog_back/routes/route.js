import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// Signup route
router.route('/signup').post(signup);

// Login route
router.route('/login').post(login);

export default router;
