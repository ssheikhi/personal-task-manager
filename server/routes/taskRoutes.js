/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

router.get('/', async (req, res) => {
  try {
    const todos = await Task.find();
    return res.status(200).json(todos);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching tasks', error: error.message });
  }
});
router.post('/', async (req, res) => {
  const { title, description, status, deadline, userId } = req.body;
  console.log('In create todo:', { title, description, status, deadline });

  try {
    // Validate required fields
    if (!title || !status) {
      return res.status(400).json({
        message: 'Title and Status are required',
      });
    }

    // Create a new task
    const task = await Task.create({
      title,
      description,
      status,
      deadline,
      userId,
      //   userId: req.user.id, // Ensure the authenticated user's ID is added
    });

    // Handle creation failure (unlikely with Task.create)
    if (!task) {
      return res.status(401).json({ message: 'Problem creating task' });
    }

    // Return the created task
    return res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    console.error('Error creating task:', error);

    // Handle any server errors
    return res.status(500).json({
      message: 'Error creating task',
      error: error.message,
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params; // Extract task ID
  const { title, description, status, deadline } = req.body;
  console.log(req.params, req.body);

  try {
    // Validate input
    if (!title && !description && !status && !deadline) {
      return res.status(400).json({ message: 'No fields to update provided' });
    }

    // Update task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, deadline },
      { new: true } // Return the updated document
    );

    // Check if task exists
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res
      .status(200)
      .json({ message: 'Task updated successfully', updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    return res
      .status(500)
      .json({ message: 'Error updating task', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Extract task ID

  try {
    // Delete task
    const deletedTask = await Task.findByIdAndDelete(id);

    // Check if task exists
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res
      .status(200)
      .json({ message: 'Task deleted successfully', deletedTask });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res
      .status(500)
      .json({ message: 'Error deleting task', error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  const { id } = req.params; // Extract task ID

  try {
    // Find task by ID
    //  Task.findOne({ _id: id });
    const task = await Task.findById(id);

    // If task not found
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Return the task
    return res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    return res
      .status(500)
      .json({ message: 'Error fetching task', error: error.message });
  }
});

module.exports = router;
