var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var util = require('../lib/utility');

var db = require('../server/config');
var User = require('../server/models/user');
var Klicks = require('../server/models/klicks');
// var Link = require('../server/models/link');

// var environment = process.env.port ? "production" : "development";

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  console.log("Reached Login User");
  User.findOne({ username: username }, function (err, user) {
    if (!user) {
      res.redirect('/login');
    } else {
      user.comparePassword(password, function(match) {
        if (match) {
          util.createSession(req, res, user.username);
        } else {
          res.redirect('/login');
        }
      });
    }
  });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function (err, user) {
    if (!user) {
      var newUser = new User({
        username: username,
        password: password
      });

      newUser.hashPassword().then(function () {
        newUser.save(function (err) {
          if (err) console.log("Error in Signup");
          util.createSession(req, res, newUser.username);
        });
      });

    } else {
      console.log('Account already exists');
      res.redirect('/signup');
    }
  });
};

exports.handleGetKlicks = function (req, res) {
  
  Klicks.findById(req.params.id, function (err, klicks) {
    if (!!err) {
      console.log("Error in GetKlicks");
      throw new Error('error', err);
    }
    res.send(200, klicks);
  });
}

exports.handlePostKlicks = function (req, res) {
  klickSession = new Klicks(req.body, function(err, obj){
    if(!!err){
      console.log("Error in Postklicks");
      throw new Error('error', err);
    }
      console.log(klickSession);



    res.send(200, obj);
  });
};

// NOT NEEDED
// exports.navToLink = function(req, res) {
//   Link.findOne({ code: req.params[0] }, function (err, link) {
//     if (!link) {
//       res.redirect('/');
//     } else {
//       link.visits = link.visits + 1;
//       link.save(function (err) {
//         if (err) console.log("Error");
//         return res.redirect(link.url);
//       });
//     }
//   });
// };

// NOT NEEDED
// exports.fetchLinks = function(req, res) {
//   Link.find({}, function (err, links) {
//     if (err) console.log("Error");
//     res.send(200, links);
//   });
// };

// exports.saveLink = function(req, res) {
//   var uri = req.body.url;

//   if (!util.isValidUrl(uri)) {
//     console.log('Not a valid url: ', uri);
//     return res.send(404);
//   }

//   Link.find({ url: uri }, function (err, link) {
//     if (link.length > 0) {
//       res.send(200, link);
//     } else {
//       Promise.promisify(util.getUrlTitle)(uri)
//         .then(function(title) {
//           var link = new Link({
//             url: uri,
//             title: title,
//             base_url: req.headers.origin
//           });

//           link.initialize();
//           link.save(function(err) {
//             if (err) console.log("Error");
//             res.send(200, link);
//           });
//         })
//         .catch(function (err) {
//           console.log("Error has occurred");
//         });
//     }
//   });
// };