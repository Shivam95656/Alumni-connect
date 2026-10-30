import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getSupabaseClient } from '../config/supabase.js';

// Alumni Register
export const registerAlumni = async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      batch,
      year,
      department,
      rollNumber,
      linkedIn,
      github
    } = req.body;

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into supabase
    const { data, error } = await supabase
      .from('alumni')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          password: hashedPassword,
          phone,
          batch,
          year,
          department,
          roll_number: rollNumber,
          linkedin: linkedIn,
          github,
          is_approved: false,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message: 'Alumni registered successfully. Awaiting admin approval.',
      alumni: data[0]
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Alumni Login
export const loginAlumni = async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find alumni
    const { data, error } = await supabase
      .from('alumni')
      .select('*')
      .eq('email', email);

    if (error || !data || data.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const alumni = data[0];

    // Check if approved
    if (!alumni.is_approved) {
      return res.status(403).json({ error: 'Your account is pending admin approval' });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, alumni.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: alumni.id, email: alumni.email, role: 'alumni' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    return res.json({
      message: 'Login successful',
      token,
      alumni: {
        id: alumni.id,
        firstName: alumni.first_name,
        lastName: alumni.last_name,
        email: alumni.email,
        phone: alumni.phone,
        batch: alumni.batch,
        year: alumni.year,
        department: alumni.department
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Alumni Profile
export const getAlumniProfile = async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { id } = req.params;

    const { data, error } = await supabase
      .from('alumni')
      .select('id, first_name, last_name, email, phone, batch, year, department, roll_number, linkedin, github')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Alumni not found' });
    }

    return res.json({ alumni: data });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Events for Alumni
export const getEvents = async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ events: data || [] });
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Internship Opportunities
export const getInternships = async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('internships')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ internships: data || [] });
  } catch (error) {
    console.error('Error fetching internships:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Placement Opportunities
export const getPlacements = async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('placements')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ placements: data || [] });
  } catch (error) {
    console.error('Error fetching placements:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
