const express = require('express');
const router = express.Router();

const companiesController = require('../controllers/companies');
const validator = require('../middleware/validateCompanies.js');
const requiresAuth = require('../middleware/requiresAuth');

router.get('/', companiesController.getAll);
router.get('/:id', companiesController.getSingle);

router.post('/', requiresAuth(), validator.saveCompany, companiesController.createNewCompany);
router.put('/:id', requiresAuth(), validator.saveCompany, companiesController.updateCompany);

router.delete('/:id', requiresAuth(), companiesController.deleteCompany);

module.exports = router;
