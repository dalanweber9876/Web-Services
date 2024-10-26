const express = require('express');
const router = express.Router();

const applicationsController = require('../controllers/applications');
const validator = require('../middleware/validateApplications');

router.get('/', applicationsController.getAll);
router.get('/:id', applicationsController.getSingle);

router.post('/', validator.saveApplication, applicationsController.createNewApplication);
router.put('/:id', validator.saveApplication, applicationsController.updateApplication);

router.delete('/:id', applicationsController.deleteApplication);

module.exports = router;
