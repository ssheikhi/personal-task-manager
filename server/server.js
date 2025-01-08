/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Import necessary modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

require('dotenv').config();
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.error('Database connection error:', err));

// Middleware: Parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware: Cookie parser (optional)
app.use(cookieParser());

// Middleware: Routes
app.use('/api/auth', authRoutes);

app.use('/api/todo', taskRoutes);

// Middleware: Serve static files
app.use(express.static(path.resolve(__dirname, '../dist')));

// Wildcard route for SPA (React frontend)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

// Middleware: 404 handler
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Middleware: Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: err.message || 'Internal Server Error' });
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});

// Export the app (for testing or further use)
module.exports = app;
