const CompanyController = require("../Controllers/CompanyController/CompayController");
const ProductController = require('../Controllers/ProductController/ProductController');

const router = require('express').Router()

//Middlewares
const verifyToken = require('../Helpers/verifyToken');
const { imageUpload } = require('../Helpers/imageUpload');

//Routes Company
router.get('/', verifyToken, CompanyController.index);

//Post routes
router.post('/register', verifyToken, CompanyController.register);
router.post('/edit/:id', verifyToken, imageUpload.single("image"), CompanyController.editCompany);
router.post('/:id/product/register', verifyToken, imageUpload.single("image"), ProductController.register);

//Exports
module.exports = router