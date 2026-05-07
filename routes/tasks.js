import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all tasks
// This queries the database and returns all tasks as JSON
router.get('/', async (req, res) => {
  try {
    // SQL query to get all tasks, newest first
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    
    // Send the rows back as JSON
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST a new task
// This inserts a new task into the database
router.post('/', async (req, res) => {
  try {
    // Destructure the request body
    const { title, description, assigned_to, ward, priority } = req.body;

    // Parameterised query - the $1, $2 etc are placeholders
    // This prevents SQL injection attacks
    const result = await pool.query(
      `INSERT INTO tasks (title, description, assigned_to, ward, priority)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, assigned_to, ward, priority]
    );

    // Return the newly created task
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating task:', err.message);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

export default router;