const UserController = require("../Controllers/UserController");
const router = require('express').Router()

//Middlewares
const verifyToken = require('../Helpers/verifyToken');
const { imageUpload } = require('../Helpers/imageUpload');


//Routes User
//Get Routes
router.get('/profile/:id', UserController.getUserById);
router.get('/checkuser', UserController.checkUser);

//Post Routes
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.patch('/edit/', verifyToken, imageUpload.single("image"), UserController.editUser);


//Exports
module.exports = router