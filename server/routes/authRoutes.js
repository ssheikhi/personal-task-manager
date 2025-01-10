/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for user signup
router.post('/signup', authController.signup, (req, res) => {
  res.status(201).json({ message: 'User created successfully' });
  // res.redirect('/login');
});

// Route for user login
router.post('/login', authController.login);

module.exports = router;
