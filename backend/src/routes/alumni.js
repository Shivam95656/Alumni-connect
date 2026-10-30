import express from 'express';
import {
  registerAlumni,
  loginAlumni,
  getAlumniProfile,
  getEvents,
  getInternships,
  getPlacements
} from '../controllers/alumniController.js';
import { verifyAlumni } from '../middleware/auth.js';

const router = express.Router();

// Public Routes
router.post('/register', registerAlumni);
router.post('/login', loginAlumni);

// Protected Routes
router.get('/profile/:id', verifyAlumni, getAlumniProfile);
router.get('/events', verifyAlumni, getEvents);
router.get('/internships', verifyAlumni, getInternships);
router.get('/placements', verifyAlumni, getPlacements);

export default router;
