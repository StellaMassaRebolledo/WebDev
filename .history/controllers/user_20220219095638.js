let User = require('../models/user');
let passport = require('passport');

exports.user = function(req, res, next) {
    res.render('user', { 
        title: 'Users',
        name: 'Student'
    });
}

exports.stella = function(req, res, next) {
    res.render('user', { 
        title: 'User',
        name: 'Stella'
    });
}

function getErrorMessage(err) {
    console.log("===> Error: " + err);
    let message = '';
  
    if (err.code) {
      switch (err.code) {
        case 11000:
        case 11001:
          message = 'Username already exists';
          break;
        default:
          message = 'Something went wrong';
      }
    } else {
      for (var errName in err.errors) {
        if (err.errors[errName].message) message = err.errors[errName].message;
      }
    }
  
    return message;
  };

  module.exports.renderSignup = function(req, res, next) {
    if (!req.user) {
  
      // creates a empty new user object.
      let newUser = User();
  
      res.render('auth/signup', {
        title: 'Sign-up Form',
        messages: req.flash('error'),
        user: newUser
      });
  
    } else {
      return res.redirect('/');
    }
  };

  
module.exports.signup = function(req, res, next) {
    if (!req.user) {
      console.log(req.body);
  
      let user = new User(req.body);

      console.log(user);
  
      user.save((err) => {
        if (err) {
          let message = getErrorMessage(err);
  
          req.flash('error', message);
          // return res.redirect('/users/signup');
          return res.render('auth/signup', {
            title: 'Sign-up Form',
            messages: req.flash('error'),
            user: user
          });
        }
        req.login(user, (err) => {
          if (err) return next(err);
          return res.redirect('/');
        });
      });
    } else {
      return res.redirect('/');
    }
  };


  module.exports.renderLogin = function(req, res, next) {
    if (!req.user) {
      res.render('auth/login', {
        title: 'Login',
        messages: req.flash('error') || req.flash('info')
      });
    } else {
      console.log(req.user);
      return res.redirect('/users/login');
    }
  };

 
module.exports.login = function(req, res, next){
    passport.authenticate('local', {   
      successRedirect: req.session.url || '/users/business',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
    delete req.session.url;
  } 


  module.exports.signout = function(req, res, next) {
    req.logout();
    res.redirect('/');
  };

  /*
  exports.list = function(req, res, next) {
    User.find((err,userList)=>
    {
        if(err)
        {
            return console.error(err);
        }
        else
        {
          
            res.render('contacts',
            {
                title: 'Business Contact List',
                UserList: userList,
                userName: req.user ? req.user.username : ''
            }
            );
        }
    });
}
module.exports.displayAddPage = (req, res, next) => {
    
  let newItem = User();

  res.render('', {
      title: 'Add a new Item',
      item: newItem,
      userName: req.user ? req.user.username : ''
  })          
}

module.exports.processAddPage = (req, res, next) => {
  
  let newItem = Inventory({
      _id: req.body.id,
      item: req.body.item,
      qty: req.body.qty,
      status: req.body.status,
      size : {
          h: req.body.size_h,
          w: req.body.size_w,
          uom: req.body.size_uom,
      },
      tags: req.body.tags.split(",").map(word => word.trim())
  });

  Inventory.create(newItem, (err, item) =>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the book list
          console.log(item);
          res.redirect('/inventory/list'); //function from above
      }
  });
}
*/

module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;

  Inventory.findById(id, (err, itemToEdit) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //show the edit view
          res.render('inventory/add_edit', {
              title: 'Edit Item', 
              item: itemToEdit,
              userName: req.user ? req.user.username : ''
          })
      }
  });
}


module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id

  let updatedItem = Inventory({
      _id: req.body.id,
      item: req.body.item,
      qty: req.body.qty,
      status: req.body.status,
      size : {
          h: req.body.size_h,
          w: req.body.size_w,
          uom: req.body.size_uom,
      },
      tags: req.body.tags.split(",").map(word => word.trim())
  });

  // console.log(updatedItem);

  Inventory.updateOne({_id: id}, updatedItem, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // console.log(req.body);
          // refresh the book list
          res.redirect('/inventory/list');
      }
  });
}

module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;

  Inventory.remove({_id: id}, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the book list
          res.redirect('/inventory/list');
      }
  });
}