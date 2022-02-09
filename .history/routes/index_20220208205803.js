var express = require('express');
var router = express.Router();
let indexController = require ('../controllers/index');

/* GET home page. */
router.get('/', indexController); 

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'About Me' });
});

module.exports = router;
