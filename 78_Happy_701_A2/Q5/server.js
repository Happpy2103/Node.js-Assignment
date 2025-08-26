const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your_jwt_secret_key';  // Change this in production!

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// =====================
// Static Admin Details
// =====================
const STATIC_ADMIN = {
  id: 'admin-id',
  username: 'Admin',
  name: 'Administrator',
  email: 'admin@example.com',
  department: 'Management',
  position: 'Admin',
  salary: 0
};

// In-memory leave storage
let leaveApplications = [];

// =====================
// Utility: Authenticate JWT middleware
// =====================
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: 'Access token missing' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user; // { id, username }
    next();
  });
}

// =====================
// Routes
// =====================

// Login (Static)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Static credentials
  if (username !== STATIC_ADMIN.username || password !== 'Admin123') {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Create JWT token
  const token = jwt.sign({ id: STATIC_ADMIN.id, username: STATIC_ADMIN.username }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Get profile (Static Admin)
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json(STATIC_ADMIN);
});

// Add leave application
app.post('/api/leave', authenticateToken, (req, res) => {
  const { date, reason } = req.body;

  if (!date || !reason) {
    return res.status(400).json({ message: 'Date and reason are required' });
  }

  const leaveApp = {
    id: leaveApplications.length + 1,
    employeeId: STATIC_ADMIN.id,
    date,
    reason,
    granted: false
  };
  leaveApplications.push(leaveApp);

  res.status(201).json({ message: 'Leave application submitted' });
});

// List all leave applications
app.get('/api/leave', authenticateToken, (req, res) => {
  const leaves = leaveApplications.filter(l => l.employeeId === STATIC_ADMIN.id);
  res.json(leaves);
});

// Serve frontend HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/profile.html'));
});

app.get('/leave', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/leave.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
