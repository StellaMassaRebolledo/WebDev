exports.home = function(req, res, next) {
  res.render('index', { 
      title: 'Home',
      userName: req.user ? req.user.username : '' 
  });
}


exports.projects = function(req, res, next) {
  res.render(
      'projects', 
      { 
          title: 'Projects',
          userName: req.user ? req.user.username : '' 
      }
  );
}

exports.about = function(req, res, next) {
  res.render('about', { 
      title: 'About Me',
      userName: req.user ? req.user.username : '' 
  });
}