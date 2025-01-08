/* eslint-disable no-undef */
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Utility function to create a JWT
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = createToken;
