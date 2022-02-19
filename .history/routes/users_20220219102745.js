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

router.get('/list', inventoryController.list);

// Routers for edit. Specifying :id, allows me to use it as a param in controllers
router.get('/edit/:id', requireAuth, userController.displayEditPage);
router.post('/edit/:id', requireAuth, userController.processEditPage);

// Delete
router.get('/delete/:id', requireAuth, userController.performDelete);


module.exports = router;