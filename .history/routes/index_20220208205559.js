var express = require('express');
var router = express.Router();
let indexcontroller=

/* GET home page. */
router.get('/',); 

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'About Me' });
});

module.exports = router;
