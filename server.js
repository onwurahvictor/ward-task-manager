import 'dotenv/config';
import express from 'express';
import pool from './db.js';
import taskRoutes from './routes/tasks.js';
import authRoutes from './routes/auth.js';
import authenticateToken from './middleware/auth.js';

const app = express();

// Middleware - tells Express to parse incoming JSON requests
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static('public'));

// Public routes
app.use('/api/auth', authRoutes);
// Protected routes
app.use('/api/tasks', authenticateToken, taskRoutes);

// Basic test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Ward Task Manager API is running' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});