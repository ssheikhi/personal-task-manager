/* eslint-disable no-undef */
const Task = require('../models/taskModel');
const taskController = {};

// Controller to get all tasks
taskController.getAllTasks = async (req, res) => {
  const userId = req.userId;
  console.log('in get todos', userId);

  try {
    const todos = await Task.find({ userId });
    return res.status(200).json(todos);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching tasks', error: error.message });
  }
};

// Controller to create a task
taskController.createTask = async (req, res) => {
  const { title, description, status, deadline } = req.body;
  const userId = req.userId;

  console.log('In create todo:', {
    title,
    description,
    status,
    deadline,
    userId,
  });

  try {
    if (!title || !status) {
      return res.status(400).json({ message: 'Title and Status are required' });
    }

    const task = await Task.create({
      title,
      description,
      status,
      deadline,
      userId,
    });

    if (!task) {
      return res.status(401).json({ message: 'Problem creating task' });
    }

    return res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error('Error creating task:', error);
    return res
      .status(500)
      .json({ message: 'Error creating task', error: error.message });
  }
};

// Controller to update a task
taskController.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, deadline } = req.body;
  console.log(req.params, req.body);

  try {
    if (!title && !description && !status && !deadline) {
      return res.status(400).json({ message: 'No fields to update provided' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, deadline },
      { new: true }
    );

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
};

// Controller to delete a task
taskController.deleteTask = async (req, res) => {
  const { id } = req.params;
  console.log('in delete ');

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

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
};

// Controller to get a task by ID
taskController.getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    return res
      .status(500)
      .json({ message: 'Error fetching task', error: error.message });
  }
};

module.exports = taskController;
