var express = require('express');
var router = express.Router();
let indexController = require ('../controllers/index');

/* GET home page. */
router.get('/', indexController.home); 

/* GET about page. */
router.get('/about', indexController.about);

/* GET services page. */
router.get('/services', indexController.projects);

/* GET projects page. */
router.get('/projects', indexController.projects);



module.exports = router;
