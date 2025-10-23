const authorizeAdmin = (req, res, next) => {
    try {
        const acceptsHtml = req.headers.accept && req.headers.accept.includes('text/html');

        if (!req.user) {
            if (acceptsHtml) return res.redirect('/login');
            return res.status(401).json({ message: 'Not authenticated' });
        }

        // req.user.role may be undefined for admin 'admin' id; treat id === 'admin' as admin
        const isAdmin = req.user.role === 'admin' || req.user.id === 'admin' || req.user._id === 'admin';

        if (!isAdmin) {
            if (acceptsHtml) return res.redirect('/login');
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        next();
    } catch (error) {
        const acceptsHtml = req.headers.accept && req.headers.accept.includes('text/html');
        if (acceptsHtml) return res.redirect('/login');
        return res.status(500).json({ message: 'Server error' });
    }
};

export default authorizeAdmin;
