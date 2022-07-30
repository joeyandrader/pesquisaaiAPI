const IndexController = require("../Controllers/IndexController");
const router = require('express').Router()

//Routes Index
router.get('/', IndexController.index);
router.get('/categorys', IndexController.categorys);

//Exports
module.exports = router