# Blog Frontend

A modern React frontend for the blog application with user authentication, post management, and admin features.

## Features

- **User Authentication**: Login, register, and logout functionality
- **Post Management**: Create, read, update, and delete blog posts
- **Comment System**: Add and manage comments on posts
- **Admin Dashboard**: Comprehensive admin panel for content moderation
- **Responsive Design**: Mobile-friendly interface using Bootstrap
- **Real-time Updates**: Dynamic content updates without page refresh

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:3000`

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3001`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navbar.js       # Navigation bar component
├── context/            # React context providers
│   └── AuthContext.js  # Authentication context
├── pages/              # Page components
│   ├── Home.js         # Home page with recent posts
│   ├── Login.js        # User login page
│   ├── Register.js     # User registration page
│   ├── PostList.js     # List of all posts
│   ├── PostDetail.js   # Individual post view
│   ├── CreatePost.js   # Create new post form
│   ├── EditPost.js     # Edit existing post form
│   └── AdminDashboard.js # Admin panel
├── services/           # API service functions
├── App.js             # Main application component
└── index.js           # Application entry point
```

## Features Overview

### Authentication
- User registration with validation
- Secure login with session management
- Protected routes for authenticated users
- Role-based access control (user/admin)

### Post Management
- Create new blog posts
- View all posts with pagination
- Edit and delete own posts
- Post status management (pending/published)

### Comment System
- Add comments to posts
- View all comments for a post
- Delete own comments
- Comment moderation (admin only)

### Admin Features
- Dashboard with statistics
- Approve/reject pending posts
- Moderate comments
- View all users
- Content management tools

## API Integration

The frontend communicates with the backend API through:

- **Base URL**: `http://localhost:3000/api`
- **Authentication**: Session-based with cookies
- **HTTP Client**: Axios with automatic request/response handling

### Key API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get specific post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/comments` - Add comment
- `GET /api/admin` - Admin dashboard data

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Environment Variables

The application uses the following environment variables:

- `REACT_APP_API_URL` - Backend API URL (defaults to proxy)
- `REACT_APP_ENV` - Environment (development/production)

## Styling

The application uses:
- **Bootstrap 5** for responsive design and components
- **Custom CSS** for specific styling needs
- **Responsive design** for mobile and desktop compatibility

## State Management

- **React Context** for global state (authentication)
- **Local State** for component-specific data
- **Axios interceptors** for API error handling

## Security Features

- Protected routes for authenticated users
- Role-based access control
- Input validation and sanitization
- Secure API communication with credentials

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

To build for production:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
