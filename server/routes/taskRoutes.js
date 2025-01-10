/* eslint-disable no-undef */
const express = require('express');
const taskController = require('../controllers/taskController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Route to get all tasks
router.get('/', authenticate, taskController.getAllTasks);

// Route to create a task
router.post('/',authenticate, taskController.createTask);

// Route to update a task
router.put('/:id', taskController.updateTask);

// Route to delete a task
router.delete('/:id', taskController.deleteTask);

// Route to get a task by ID
router.get('/:id', taskController.getTaskById);

module.exports = router;
