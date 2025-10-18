# E-Blog Usage Guide

This guide explains how to use the E-Blog application once it's set up and running.

## Getting Started

1. **Access the Application**
   - Open your browser and go to `http://localhost:5173`
   - You'll see the landing page with navigation

2. **Navigation**
   - Use the navigation bar to move between pages
   - Available pages: Home, Create Blog, Login, Signup, About

## User Registration and Login

### Creating an Account
1. Click "Signup" in the navigation
2. Fill in:
   - Username
   - Email
   - Password
3. Click "Sign Up"
4. You'll be redirected to login or automatically logged in

### Logging In
1. Click "Login" in the navigation
2. Enter your email and password
3. Click "Login"
4. You'll be redirected to the home page

## Creating a Blog Post

1. **Navigate to Create Blog**
   - Click "Create" in the navigation or go to `/create`

2. **Fill in Blog Details**
   - **Title**: Enter a descriptive title for your blog
   - **Category**: Select from dropdown:
     - Web
     - AI
     - Fullstack
     - Testing
     - Marketing
     - Sales
     - Business

3. **Write Content with TinyMCE Editor**
   - The description field uses TinyMCE rich text editor
   - **Basic Formatting**:
     - Bold, italic text
     - Headings and paragraphs
     - Bullet points and numbered lists
     - Text alignment
   - **Advanced Features**:
     - Undo/redo
     - Insert links, images
     - Code blocks
     - Tables
     - Media embedding

4. **Submit the Blog**
   - Click "Create Blog" button
   - You'll see a success notification
   - Form will reset for creating another blog

## Viewing Blogs

1. **Home Page**
   - Shows featured blogs and recent posts
   - Browse different categories

2. **Blog Section**
   - Navigate to `/blog` for full blog listing
   - View all published blogs
   - Filter by category if implemented

3. **Individual Blog Posts**
   - Click on blog titles to read full posts
   - Rich formatting will be displayed correctly

## Editor Features

### TinyMCE Toolbar
- **Format**: Select text formatting (paragraph, headings)
- **Bold/Italic**: Basic text styling
- **Lists**: Bulleted and numbered lists
- **Alignment**: Left, center, right, justify text
- **Links**: Insert and edit hyperlinks
- **Media**: Insert images, videos, or other media
- **Code**: Insert code blocks or inline code
- **Table**: Create and edit tables
- **Help**: Access TinyMCE help documentation

### Tips for Writing
- Use headings (H1, H2, H3) to structure your content
- Add images to make posts more engaging
- Use bullet points for lists
- Preview your content before publishing
- Save drafts if needed (currently not implemented)

## User Interface Tips

### Responsive Design
- The app works on desktop, tablet, and mobile
- Navigation adapts to screen size
- Editor is fully responsive

### Notifications
- Success messages appear when actions complete
- Error messages show if something goes wrong
- Toast notifications appear in top-right corner

### Form Validation
- Required fields are marked
- Invalid inputs show error messages
- TinyMCE editor validates content presence

## Advanced Usage

### Keyboard Shortcuts (TinyMCE)
- `Ctrl+B`: Bold
- `Ctrl+I`: Italic
- `Ctrl+Z`: Undo
- `Ctrl+Y`: Redo
- `Ctrl+A`: Select all

### Content Best Practices
- Use descriptive titles
- Choose appropriate categories
- Write clear, engaging content
- Use proper formatting for readability
- Add relevant images or media

## Troubleshooting

### Editor Issues
- If TinyMCE doesn't load, check your API key
- Clear browser cache if experiencing issues
- Check browser console for errors

### Login Issues
- Ensure correct email/password
- Check if account was created successfully
- Clear browser cookies if persistent issues

### Blog Creation Issues
- Ensure all required fields are filled
- Check network connection
- Verify backend server is running

## API Usage (For Developers)

If you want to interact with the API directly:

### Authentication
```bash
# Login
POST http://localhost:4000/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}

# Signup
POST http://localhost:4000/signup
Content-Type: application/json

{
  "username": "username",
  "email": "user@example.com",
  "password": "password"
}
```

### Blog Operations
```bash
# Create Blog
POST http://localhost:4000/blogs
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "My Blog Title",
  "category": "Web",
  "description": "<p>Rich HTML content</p>"
}

# Get Blogs
GET http://localhost:4000/blogs
```

## Support

For technical issues:
1. Check the setup guide
2. Review error messages
3. Ensure all services are running
4. Check network connectivity

For feature requests or bugs:
- Create an issue in the repository
- Include steps to reproduce
- Provide browser/console error messages
