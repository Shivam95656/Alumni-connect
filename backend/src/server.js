import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeSupabase } from './config/supabase.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase
initializeSupabase();

// Import routes
import alumniRoutes from './routes/alumni.js';
import adminRoutes from './routes/admin.js';

// Routes
app.use('/api/alumni', alumniRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Alumni Connect API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`Alumni Connect API running on port ${PORT} [${NODE_ENV}]`);
});

export default app;
