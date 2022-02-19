var express = require('express');
var router = express.Router();
let userController = require('../controllers/user')

/* GET users listing. */
router.get('/', userController.user);

/* GET users listing. */
router.get('/stella', userController.stella);

// Sign-up
router.get('/signup', userController.renderSignup);
router.post('/signup', userController.signup);

// Login
router.get('/login', userController.renderLogin);
router.post('/login', userController.login);

// Sign out
router.get('/signout', userController.signout);

module.exports = router;