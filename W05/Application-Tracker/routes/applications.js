const express = require('express');
const router = express.Router();

const applicationsController = require('../controllers/applications');

router.get('/', applicationsController.getAll);
router.get('/:id', applicationsController.getSingle);
router.post('/', applicationsController.createNewApplication);

// Not yet implemented
router.put('/:id', applicationsController.updateApplication);
router.delete('/:id', applicationsController.deleteApplication);

module.exports = router;
