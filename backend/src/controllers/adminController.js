import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getSupabaseClient } from '../config/supabase.js';

// Admin Register
export const registerAdmin = async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('admins')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message: 'Admin registered successfully',
      admin: data[0]
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email);

    if (error || !data || data.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const admin = data[0];
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    return res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Pending Alumni Requests
export const getPendingAlumni = async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('alumni')
      .select('*')
      .eq('is_approved', false);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ pendingAlumni: data || [] });
  } catch (error) {
    console.error('Error fetching pending alumni:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Approve Alumni
export const approveAlumni = async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { alumniId } = req.params;

    const { data, error } = await supabase
      .from('alumni')
      .update({ is_approved: true })
      .eq('id', alumniId)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({
      message: 'Alumni approved successfully',
      alumni: data[0]
    });
  } catch (error) {
    console.error('Error approving alumni:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Reject Alumni
export const rejectAlumni = async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { alumniId } = req.params;

    const { error } = await supabase
      .from('alumni')
      .delete()
      .eq('id', alumniId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ message: 'Alumni request rejected' });
  } catch (error) {
    console.error('Error rejecting alumni:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Create Event
export const createEvent = async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { title, description, date, location, eventCategory } = req.body;

    if (!title || !date) {
      return res.status(400).json({ error: 'Title and date required' });
    }

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          title,
          description,
          date,
          location,
          event_category: eventCategory,
          created_by: req.user.id,
          is_active: true,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message: 'Event created successfully',
      event: data[0]
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Create Internship Opportunity
export const createInternship = async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { title, company, description, requirements, deadline, stipend, location } = req.body;

    if (!title || !company) {
      return res.status(400).json({ error: 'Title and company required' });
    }

    const { data, error } = await supabase
      .from('internships')
      .insert([
        {
          title,
          company,
          description,
          requirements,
          deadline,
          stipend,
          location,
          created_by: req.user.id,
          is_active: true,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message: 'Internship opportunity posted successfully',
      internship: data[0]
    });
  } catch (error) {
    console.error('Error creating internship:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Create Placement Opportunity
export const createPlacement = async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { title, company, description, salary, location, deadline, eligibility } = req.body;

    if (!title || !company) {
      return res.status(400).json({ error: 'Title and company required' });
    }

    const { data, error } = await supabase
      .from('placements')
      .insert([
        {
          title,
          company,
          description,
          salary,
          location,
          deadline,
          eligibility,
          created_by: req.user.id,
          is_active: true,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message: 'Placement opportunity posted successfully',
      placement: data[0]
    });
  } catch (error) {
    console.error('Error creating placement:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Search Alumni by filters
export const searchAlumni = async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { batch, year, department } = req.query;

    let query = supabase
      .from('alumni')
      .select('*')
      .eq('is_approved', true);

    if (batch) query = query.eq('batch', batch);
    if (year) query = query.eq('year', year);
    if (department) query = query.eq('department', department);

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ alumni: data || [] });
  } catch (error) {
    console.error('Error searching alumni:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Alumni Profile (For Admin)
export const getAlumniProfile = async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { alumniId } = req.params;

    const { data, error } = await supabase
      .from('alumni')
      .select('*')
      .eq('id', alumniId)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Alumni not found' });
    }

    return res.json({ alumni: data });
  } catch (error) {
    console.error('Error fetching alumni profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
