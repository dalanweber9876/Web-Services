const express = require('express');
const router = express.Router();

const companiesController = require('../controllers/companies');
const validator = require('../middleware/validateCompanies.js');

router.get('/', companiesController.getAll);
router.get('/:id', companiesController.getSingle);

router.post('/', validator.saveCompany, companiesController.createNewCompany);
router.put('/:id', validator.saveCompany, companiesController.updateCompany);

router.delete('/:id', companiesController.deleteCompany);

module.exports = router;
