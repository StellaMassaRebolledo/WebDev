//importing express to handle my routing
let express = require('express');

//Calling the router method from express into a variable
let router = express.Router();

//Importing mongoose to handle my db
let mongoose = require('mongoose');

//Importing my route to my db handle
let Inventory = require('../models/inventory')

router.get('/list', function(req, res, next) {
    Inventory.find((err,inventoryList)=>
    {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            console.log(inventoryList)

        }
    });


    res.render('index', { title: 'About Me' });
  });

  //exporting the module that is handling the request to my collection 
  module.exports = router;