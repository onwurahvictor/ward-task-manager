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

// PATCH - Update task status
// PATCH is used when updating only part of a record (not the whole thing)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );

    // If no rows returned, task wasn't found
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating task status:', err.message);
    res.status(500).json({ error: 'Failed to update task status' });
  }
});

// DELETE - Remove a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM tasks WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err.message);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});


export default router;