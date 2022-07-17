const IndexController = require("../Controllers/IndexController");
const router = require('express').Router()

//Routes Index
router.get('/', IndexController.index);


//Exports
module.exports = router