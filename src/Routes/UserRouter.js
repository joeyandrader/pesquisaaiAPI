const UserController = require("../Controllers/UserController");
const router = require('express').Router()

//Routes Index
router.post('/register', UserController.register);
router.get('/profile/:id', UserController.getUserById);
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser);

//Exports
module.exports = router