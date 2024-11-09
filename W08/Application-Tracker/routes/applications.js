const express = require('express');
const router = express.Router();

const applicationsController = require('../controllers/applications');
const validator = require('../middleware/validateApplications');
const requiresAuth = require('../middleware/requiresAuth');

router.get('/', applicationsController.getAll);
router.get('/:id', applicationsController.getSingle);

router.post(
  '/',
  requiresAuth(),
  validator.saveApplication,
  applicationsController.createNewApplication
);

router.put(
  '/:id',
  requiresAuth(),
  validator.saveApplication,
  applicationsController.updateApplication
);

router.delete('/:id', requiresAuth(), applicationsController.deleteApplication);

module.exports = router;
