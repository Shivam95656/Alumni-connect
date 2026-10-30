# Alumni Connect - Setup Guide

## Project Overview

Alumni Connect is a full-stack web application built with:
- **Backend**: Node.js (Express)
- **Frontend**: HTML, CSS, JavaScript  
- **Database**: Supabase (PostgreSQL)

## Prerequisites

- Node.js (v14+)
- npm or yarn
- Supabase account
- Modern web browser

## Installation Steps

### 1. Backend Setup

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory with your Supabase credentials:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-public-key
JWT_SECRET=your-secure-jwt-secret-key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

### 3. Database Setup

1. Create a Supabase project at https://supabase.com
2. Run the SQL scripts from `docs/DATABASE_SCHEMA.md` in the SQL editor
3. Update your `.env` file with Supabase credentials

### 4. Frontend Setup

The frontend doesn't require installation. Just ensure:
- All HTML files are in their respective folders
- CSS and JS files are properly linked
- Update the `API_BASE_URL` in `frontend/shared/js/api.js` if using different port

### 5. Running the Application

**Start Backend Server:**
```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on: `http://localhost:5000`

**Run Frontend:**
- Alumni: Open `frontend/alumni/login.html` in browser
- Admin: Open `frontend/admin/login.html` in browser

## Project Structure

```
Alumni Connect/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Auth & validation
│   │   ├── config/          # Database config
│   │   └── server.js        # Main server file
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── alumni/              # Alumni portal
│   │   ├── login.html
│   │   └── dashboard.html
│   ├── admin/               # Admin panel
│   │   ├── login.html
│   │   └── dashboard.html
│   ├── shared/              # Shared assets
│   │   ├── css/
│   │   └── js/
└── docs/                    # Documentation
```

## Features

### Alumni Module
- Register with detailed profile information
- Login (after admin approval)
- View personal profile
- Browse events
- View internship opportunities
- View placement opportunities

### Admin Module
- Register and login
- View pending alumni registrations
- Approve/reject alumni requests
- Create and manage events
- Post internship opportunities
- Post placement opportunities
- Search and filter alumni by batch, year, department
- View alumni profiles

## API Endpoints

### Alumni Routes
- `POST /api/alumni/register` - Register alumnus
- `POST /api/alumni/login` - Alumni login
- `GET /api/alumni/profile/:id` - Get profile (requires auth)
- `GET /api/alumni/events` - Get events (requires auth)
- `GET /api/alumni/internships` - Get internships (requires auth)
- `GET /api/alumni/placements` - Get placements (requires auth)

### Admin Routes
- `POST /api/admin/register` - Register admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/pending-alumni` - Get pending approvals (requires auth)
- `PUT /api/admin/approve-alumni/:alumniId` - Approve alumni (requires auth)
- `DELETE /api/admin/reject-alumni/:alumniId` - Reject alumni (requires auth)
- `POST /api/admin/events` - Create event (requires auth)
- `POST /api/admin/internships` - Post internship (requires auth)
- `POST /api/admin/placements` - Post placement (requires auth)
- `GET /api/admin/search-alumni` - Search alumni (requires auth)
- `GET /api/admin/alumni-profile/:alumniId` - Get alumni profile (requires auth)

## Security Notes

1. **JWT Tokens**: All protected routes require a valid JWT token in Authorization header
2. **Password Hashing**: Passwords are hashed using bcrypt before storage
3. **CORS**: Enable CORS for frontend URLs
4. **Environment Variables**: Never commit `.env` files
5. **Rate Limiting**: Consider adding rate limiting for production

## Troubleshooting

### Connection Issues
- Check if backend is running on port 5000
- Verify Supabase credentials in `.env`
- Check CORS settings

### Database Issues
- Ensure all tables are created
- Check Supabase connection string
- Verify RLS policies if enabled

### Authentication Issues
- Clear browser cache and localStorage
- Check JWT_SECRET is set correctly
- Verify token is being sent in Authorization header

## Future Enhancements

- Email notifications
- File uploads for resumes
- Advanced search with multiple filters
- Analytics dashboard
- Mobile application
- Two-factor authentication
- Integration with LinkedIn/GitHub APIs
