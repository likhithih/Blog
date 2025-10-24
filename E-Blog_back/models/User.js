import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId; // Password required only if not a Google user
        },
        minlength: 6
    },
    confirmPassword: {
        type: String,
        required: function() {
            return !this.googleId; // Confirm password required only if not a Google user
        },
        minlength: 6
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows null values but enforces uniqueness for non-null
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    jobTitle: {
        type: String,
        trim: true,
        maxlength: 100,
        default: ''
    },
    profilePic: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
