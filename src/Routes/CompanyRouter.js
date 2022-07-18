const CompanyController = require("../Controllers/CompayController");
const router = require('express').Router()

//Middlewares
const verifyToken = require('../Helpers/verifyToken');

//Routes Company
router.get('/', verifyToken, CompanyController.index);

//Post routes
router.post('/register', verifyToken, CompanyController.register);

//Exports
module.exports = router