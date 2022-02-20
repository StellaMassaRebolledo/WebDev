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



module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;

  User.findById(id, (err, contactToEdit) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //show the edit view
          res.render('update', {
              title: 'Update Contact', 
              contact: contactToEdit,
              userName: req.user ? req.user.username : ''
          })
      }
  });
}


module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id

  let updatedContact = User({
      _id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      ,
      email: req.body.email,
            
  });

  // console.log(updatedContact);

  Inventory.updateOne({_id: id}, updatedContact, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // console.log(req.body);
          // refresh the book list
          res.redirect('/user/list');
      }
  });
}

module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;

  User.remove({_id: id}, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the book list
          res.redirect('/user/business');
      }
  });
}