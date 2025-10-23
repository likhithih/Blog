import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for profile picture uploads
const storage = multer.diskStorage({
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

const upload = multer({
    storage: storage,
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

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password -confirmPassword').sort({ createdAt: -1 });
        res.json({
            message: 'Users retrieved successfully',
            users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Special case for admin login
        if (email === 'admin@gmail.com' && password === 'admin') {
            // Generate JWT token for admin
            const token = jwt.sign({ id: 'admin' }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });

            return res.json({
                message: 'Login successful',
                token,
                user: {
                    id: 'admin',
                    username: 'admin',
                    email: 'admin@gmail.com',
                    role: 'admin'
                }
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Prevent deleting admin
        if (id === 'admin') {
            return res.status(400).json({ message: 'Cannot delete admin user' });
        }

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, email, jobTitle } = req.body;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if username or email is already taken by another user
        if (username && username !== user.username) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                return res.status(400).json({ message: 'Username already taken' });
            }
        }

        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: 'Email already taken' });
            }
        }

        // Handle profile picture upload
        let profilePicUrl = user.profilePic;
        if (req.file) {
            // Delete old profile picture if it exists
            if (user.profilePic && user.profilePic.startsWith('/uploads/profiles/')) {
                const oldPath = path.join(process.cwd(), user.profilePic);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            // Set new profile picture path
            profilePicUrl = `/uploads/profiles/${req.file.filename}`;
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...(username && { username }),
                ...(email && { email }),
                ...(jobTitle !== undefined && { jobTitle }),
                ...(profilePicUrl && { profilePic: profilePicUrl })
            },
            { new: true }
        ).select('-password -confirmPassword');

        res.json({
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

