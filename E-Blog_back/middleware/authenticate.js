import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authenticate = async (req, res, next) => {
    try {
        const acceptsHtml = req.headers.accept && req.headers.accept.includes('text/html');
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            // Redirect browser clients to login, API clients get 401 JSON
            if (acceptsHtml) return res.redirect('/login');
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

        // Handle admin token
        if (decoded.id === 'admin') {
            req.user = { id: 'admin', role: 'admin' };
            return next();
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            if (acceptsHtml) return res.redirect('/login');
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        const acceptsHtml = req.headers.accept && req.headers.accept.includes('text/html');
        if (acceptsHtml) return res.redirect('/login');
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default authenticate;
