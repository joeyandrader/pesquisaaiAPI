const AdminController = require("../Controllers/AdminController/AdminController");
const router = require('express').Router()


//Middlewares
const verifyToken = require('../Helpers/verifyToken');

//Routes Index
//Get Router
router.get('/', AdminController.index);

//Post router
router.post('/category/register', verifyToken, AdminController.categoryRegister);
//Exports
module.exports = router