# Alumni Connect - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file with your Supabase credentials
# Copy from .env.example and fill in your values
cp .env.example .env
```

Your `.env` should look like:
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your_public_key_here
JWT_SECRET=your_secret_key_of_at_least_32_characters
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

### Step 2: Setup Database

1. Go to [Supabase](https://supabase.com) and create a project
2. Go to SQL Editor
3. Copy SQL from `docs/DATABASE_SCHEMA.md`
4. Run each SQL script to create tables

### Step 3: Start Backend

```bash
# From backend directory
npm start
# or for development with auto-reload
npm run dev
```

You should see:
```
Alumni Connect API running on port 5000 [development]
Supabase initialized successfully
```

### Step 4: Access Frontend

**Alumni Portal:**
- Open `frontend/alumni/login.html` in your browser
- Click "Register" to create an alumni account
- Wait for admin approval

**Admin Panel:**
- Open `frontend/admin/login.html` in your browser
- Click "Register" to create an admin account
- Login immediately without waiting for approval

### Step 5: Test the Application

**As Admin:**
1. Login to admin panel
2. Go to "Approvals" tab
3. Find the alumni you registered and click "Approve"

**As Alumni:**
1. Login to alumni portal with your credentials
2. You should now have access to dashboard
3. Explore sections: Profile, Events, Internships, Placements

---

## 📁 Important Files Location

```
Alumni Connect/
├── index.html                          # Home page
├── README.md                           # Project overview
├── backend/
│   ├── src/server.js                   # Start here for backend
│   └── .env.example                    # Template for environment variables
├── frontend/
│   ├── alumni/
│   │   ├── login.html                  # Alumni login/register
│   │   └── dashboard.html              # Alumni dashboard
│   └── admin/
│       ├── login.html                  # Admin login/register
│       └── dashboard.html              # Admin dashboard
└── docs/
    ├── DATABASE_SCHEMA.md              # SQL scripts for database
    ├── API_DOCUMENTATION.md            # All API endpoints
    ├── SETUP_GUIDE.md                  # Detailed setup
    └── DEPLOYMENT_GUIDE.md             # Deployment instructions
```

---

## 🔑 Test Credentials

After setting up, you can test with these:

**Admin:**
- Email: admin@test.com
- Password: admin123

**Alumni (needs admin approval first):**
- Email: alumni@test.com
- Password: alumni123

---

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Check Node.js version
node --version  # Should be v14 or higher

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check if port 5000 is already in use
netstat -an | grep 5000  # on Windows
lsof -i :5000           # on Mac/Linux
```

### Can't connect to Supabase?
- Check SUPABASE_URL is correct
- Check SUPABASE_KEY is correct
- Make sure your Supabase project is active
- Check if database tables exist

### Frontend not working?
- Make sure backend is running on port 5000
- Check browser console (F12) for errors
- Clear browser cache
- Try in incognito/private mode

### JWT Errors?
- Ensure JWT_SECRET is at least 32 characters
- Clear localStorage in browser
- Re-login

---

## 📚 Next Steps

1. **Read Full Documentation:** See `docs/SETUP_GUIDE.md` for detailed setup
2. **Explore API:** See `docs/API_DOCUMENTATION.md` for all endpoints
3. **Database:** See `docs/DATABASE_SCHEMA.md` for database structure
4. **Deploy:** See `docs/DEPLOYMENT_GUIDE.md` for production deployment

---

## 🎯 Feature Checklist

### Alumni Module
- [x] Registration
- [x] Login
- [x] Profile viewing
- [x] Events browsing
- [x] Internships browsing
- [x] Placements browsing

### Admin Module
- [x] Registration
- [x] Login
- [x] Alumni approval/rejection
- [x] Event management
- [x] Internship posting
- [x] Placement posting
- [x] Alumni search & filtering

---

## 💡 Tips

1. **Use Incognito Mode:** Better for testing login flows
2. **Check Console:** Press F12 to see detailed error messages
3. **Keep Backend Running:** Don't close the backend terminal
4. **Postman/Thunder Client:** Test API endpoints directly
5. **Browser DevTools:** Check Network tab for API calls

---

## 🆘 Need Help?

1. Check the error message in browser console
2. Check backend console for server errors
3. Review the documentation files
4. Check if all environment variables are set
5. Verify database tables exist in Supabase

---

## 🎉 You're All Set!

Now you have a fully functional Alumni Connect platform. Start managing alumni, posting opportunities, and building your community!

**Happy Coding! 🚀**
