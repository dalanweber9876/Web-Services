const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/applications', require('./applications'));
router.use('/companies', require('./companies'));

// This is to display the specific message based on if the user is authenticated.
router.use('/', (req, res) => {
  const isAuthenticated = false; // Change to true or false to test
  res.render('../frontend/index.ejs', {
    isAuthenticated: isAuthenticated
  });
});

module.exports = router;
