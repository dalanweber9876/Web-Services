const express = require('express');
const router = express.Router();

// This is to display the specific message based on if the user is authenticated.
router.use('/', (req, res) => {
  const isAuthenticated = true; // Change to true or false to test
  res.render('../frontend/index.ejs', {
    isAuthenticated: isAuthenticated
  });
});
router.use('/', require('./swagger'));
router.use('/applications', require('./applications'));
router.use('/companies', require('./companies'));

module.exports = router;
