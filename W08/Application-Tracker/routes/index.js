const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/applications', require('./applications'));
router.use('/companies', require('./companies'));

module.exports = router;
