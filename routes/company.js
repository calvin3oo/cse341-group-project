const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController.js');

router.get('/', companyController.getAllCompanies);

router.get('/:companyId', companyController.getCompany);

router.post('/', companyController.addNewCompany);

router.put('/:companyId', companyController.updateCompany);

router.delete('/:companyId', companyController.deleteCompany);

module.exports = router;