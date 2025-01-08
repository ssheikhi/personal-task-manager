/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const createToken = require('../utility/token');

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('in signup', { name, email, password });

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name and email and password are required',
      });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'error creating user' }, error.message);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('in login', { email, password });

  try {
    // Check if all required fields are provided
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      console.log('in user not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = createToken(user._id);
    // Respond with user info
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'error when login user' }, error.message);
  }
});

module.exports = router;
