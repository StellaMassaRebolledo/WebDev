var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Abouts' });
});

module.exports = router;