# E-Blog Setup Guide

This guide provides step-by-step instructions for setting up the E-Blog application locally.

## Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Git

### 1. Clone and Install
```bash
git clone <repository-url>
cd Blog

# Install frontend dependencies
cd E-Blog_front
npm install

# Install backend dependencies
cd ../E-Blog_back
npm install
```

### 2. Environment Configuration

#### Backend (.env file in E-Blog_back/)
```env
PORT=4000
MONGODB_URL=mongodb://localhost:27017/eblog
JWT_SECRET=your-super-secret-jwt-key-here
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

#### TinyMCE API Key
- Get a free API key from [TinyMCE](https://www.tiny.cloud/)
- Replace `'your-tinymce-api-key'` in `E-Blog_front/src/Pages/CreateBlog.jsx`

### 3. Database Setup
- Install MongoDB locally or use MongoDB Atlas
- Update `MONGODB_URL` in `.env` accordingly

### 4. Run the Application
```bash
# Terminal 1: Backend
cd E-Blog_back
npm start

# Terminal 2: Frontend
cd E-Blog_front
npm run dev
```

### 5. Access
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## Detailed Setup

### Frontend Setup
The frontend is built with React and Vite.

**Dependencies:**
- React 18 with hooks
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- TinyMCE for rich text editing

**Key Files:**
- `src/App.jsx` - Main routing
- `src/Pages/CreateBlog.jsx` - Blog creation with TinyMCE
- `src/Components/` - Reusable UI components

### Backend Setup
The backend uses Express.js with MongoDB.

**Dependencies:**
- Express.js for server
- Mongoose for MongoDB ODM
- JWT for authentication
- bcryptjs for password hashing
- Multer for file uploads
- Cloudinary for image storage

**Key Files:**
- `index.js` - Server entry point
- `routes/route.js` - API routes
- `controllers/` - Business logic
- `models/` - Database schemas
- `middleware/authenticate.js` - JWT middleware

### Database Schema

**User Model:**
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

**Blog Model:**
```javascript
{
  title: String (required),
  category: String (enum: Web, AI, Fullstack, etc.),
  description: String (required),
  author: ObjectId (ref: User),
  createdAt: Date
}
```

## Troubleshooting

### Common Issues

1. **TinyMCE Editor Not Loading**
   - Ensure you have a valid TinyMCE API key
   - Check browser console for errors

2. **Database Connection Failed**
   - Verify MongoDB is running locally
   - Check `MONGODB_URL` in `.env`

3. **Port Already in Use**
   - Change PORT in `.env` or kill process using the port

4. **CORS Errors**
   - Backend has CORS enabled by default
   - Ensure frontend is running on correct port

### Development Tips

- Use `npm run dev` for hot reloading in frontend
- Use `npm start` with nodemon for backend auto-restart
- Check browser dev tools for frontend errors
- Check terminal/console for backend errors

## Deployment

### Frontend Deployment
```bash
cd E-Blog_front
npm run build
# Deploy dist/ folder to static hosting (Netlify, Vercel, etc.)
```

### Backend Deployment
- Deploy to services like Heroku, Railway, or Render
- Set environment variables in deployment platform
- Ensure MongoDB is accessible from deployment environment

## Support

If you encounter issues:
1. Check the troubleshooting section
2. Review error messages in console/terminal
3. Ensure all dependencies are installed
4. Verify environment variables are set correctly
