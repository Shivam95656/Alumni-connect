// Environment detection: use localhost during local development, Render in production
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Production Render backend URL (update if your service name on Render is different)
const PROD_API_URL = 'https://alumni-connect-backend.onrender.com/api';
const LOCAL_API_URL = 'http://localhost:5000/api';

const API_BASE_URL = isLocal ? LOCAL_API_URL : PROD_API_URL;

// Store token in localStorage
const setToken = (token) => {
  localStorage.setItem('token', token);
};

const getToken = () => {
  return localStorage.getItem('token');
};

const removeToken = () => {
  localStorage.removeItem('token');
};

// Get authorization header
const getAuthHeader = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// API Call Helper
const apiCall = async (endpoint, method = 'GET', body = null, needsAuth = false) => {
  const headers = needsAuth ? getAuthHeader() : { 'Content-Type': 'application/json' };
  
  const options = {
    method,
    headers
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred');
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Logout function
const logout = () => {
  const userType = localStorage.getItem('userType') || 'alumni';
  removeToken();
  localStorage.removeItem('userType');
  window.location.href = userType === 'admin' ? '../admin/login.html' : '../alumni/login.html';
};

// Show alert
const showAlert = (message, type = 'success') => {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;
  
  const container = document.querySelector('.container') || document.body;
  container.insertBefore(alertDiv, container.firstChild);

  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
};

// Check if user is authenticated
const isAuthenticated = () => {
  return !!getToken();
};

// Redirect if not authenticated
const requireAuth = () => {
  if (!isAuthenticated()) {
    const userType = localStorage.getItem('userType') || 'alumni';
    window.location.href = userType === 'admin' ? './login.html' : './login.html';
  }
};
