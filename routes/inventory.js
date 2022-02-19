let express = require('express');
let router = express.Router();
let inventoryController = require('../controllers/inventory');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    }
    next();
}

router.get('/list', inventoryController.list);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, inventoryController.displayAddPage);
/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, inventoryController.processAddPage);

// Routers for edit. Specifying :id, allows me to use it as a param in controllers
router.get('/edit/:id', requireAuth, inventoryController.displayEditPage);
router.post('/edit/:id', requireAuth, inventoryController.processEditPage);

// Delete
router.get('/delete/:id', requireAuth, inventoryController.performDelete);

module.exports = router;






