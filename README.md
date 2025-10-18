# E-Blog: Full-Stack Blog Application

A modern, full-stack blog application built with React (frontend) and Node.js/Express (backend), featuring user authentication, blog creation, and rich text editing with TinyMCE.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Sign up and login functionality with JWT tokens
- **Blog Management**: Create, read, and manage blog posts
- **Rich Text Editing**: TinyMCE editor for creating formatted blog content
- **Categories**: Organize blogs by categories (Web, AI, Fullstack, Testing, Marketing, Sales, Business)
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Image Upload**: Support for blog images (currently commented out in frontend)
- **Toast Notifications**: User feedback with react-toastify

## Tech Stack

### Frontend
- React 18
- Vite (build tool)
- Tailwind CSS (styling)
- React Router DOM (routing)
- Axios (HTTP client)
- React Toastify (notifications)
- TinyMCE React (rich text editor)
- Framer Motion (animations)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (authentication)
- bcryptjs (password hashing)
- Multer (file uploads)
- Cloudinary (image storage)
- CORS

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Blog
   ```

2. **Install frontend dependencies:**
   ```bash
   cd E-Blog_front
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../E-Blog_back
   npm install
   ```

## Environment Setup

### Backend Environment Variables

Create a `.env` file in the `E-Blog_back` directory with the following variables:

```env
PORT=4000
MONGODB_URL=mongodb://localhost:27017/eblog
JWT_SECRET=your-jwt-secret-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### TinyMCE API Key

For the rich text editor to work properly, you need a TinyMCE API key:

1. Sign up at [TinyMCE](https://www.tiny.cloud/)
2. Get your API key
3. Replace `'your-tinymce-api-key'` in `E-Blog_front/src/Pages/CreateBlog.jsx` with your actual key

## Running the Application

1. **Start the backend server:**
   ```bash
   cd E-Blog_back
   npm start
   ```
   The server will run on `http://localhost:4000`

2. **Start the frontend development server:**
   ```bash
   cd E-Blog_front
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Access the application:**
   Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /login` - User login

### Blogs
- `POST /blogs` - Create a new blog
- `GET /blogs` - Get all blogs

## Project Structure

```
Blog/
├── E-Blog_front/          # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── Components/    # Reusable components
│   │   ├── Pages/         # Page components
│   │   └── App.jsx        # Main app component
│   ├── package.json
│   └── vite.config.js
├── E-Blog_back/           # Node.js backend
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Custom middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── db/                # Database connection
│   ├── index.js           # Server entry point
│   └── package.json
└── README.md
```

## Usage

1. **Sign Up/Login**: Create an account or log in to access blog creation features
2. **Create Blog**: Navigate to `/create` to write a new blog post using the TinyMCE editor
3. **View Blogs**: Browse existing blogs on the home page or blog section
4. **Categories**: Filter blogs by category

### Creating a Blog

- Fill in the title and select a category
- Use the TinyMCE editor to write rich content for the description
- Submit the form to create your blog post

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
