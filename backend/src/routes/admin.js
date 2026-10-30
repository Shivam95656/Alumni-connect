import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  getPendingAlumni,
  approveAlumni,
  rejectAlumni,
  createEvent,
  createInternship,
  createPlacement,
  searchAlumni,
  getAlumniProfile
} from '../controllers/adminController.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public Routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected Routes
router.get('/pending-alumni', verifyAdmin, getPendingAlumni);
router.put('/approve-alumni/:alumniId', verifyAdmin, approveAlumni);
router.delete('/reject-alumni/:alumniId', verifyAdmin, rejectAlumni);

router.post('/events', verifyAdmin, createEvent);
router.post('/internships', verifyAdmin, createInternship);
router.post('/placements', verifyAdmin, createPlacement);

router.get('/search-alumni', verifyAdmin, searchAlumni);
router.get('/alumni-profile/:alumniId', verifyAdmin, getAlumniProfile);

export default router;
