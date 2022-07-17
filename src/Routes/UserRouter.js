const UserController = require("../Controllers/UserController");
const router = require('express').Router()

//Routes Index
router.post('/register', UserController.register);
router.get('/:id', UserController.getUserById);

//Exports
module.exports = router