var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.get('/', function(req, res, next) {
 res.render('index', { user : req.user });
});

router.route('/register')
  .get(function(req, res) {
    res.render('register', { });
  })
  .post(function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
        return res.render('register', {info: 'Sorry. That username already exists. Try again.'});
      }
      passport.authenticate('local')(req, res, function() {
        res.redirect('/');
      });
    });
  });

router.route('/login')
  .get(function(req, res) {
    res.render('login', { user: req.user });
  })
  .post(passport.authenticate('local'), function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;