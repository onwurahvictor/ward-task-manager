import 'dotenv/config';
import express from 'express';
import pool from './db.js';

const app = express();

// Middleware - tells Express to parse incoming JSON requests
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static('public'));

// Basic test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Ward Task Manager API is running' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});