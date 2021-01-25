const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

passport

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/signup', (req, res) => {
  console.log(req.body);

  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  })
  .then(([user, created]) => {
    if (created) {
      console.log(`${user.name} was created`);
      const successObject = {
        successRedirect: '/',
        successFlash: 'Successfully created and logging into account...'
      }
      passport.authenticate('local', successObject)(req, res);
    } else {
      req.flash('error', 'This email is already being used for an existing account.')
      res.redirect('/auth/signup');
    }
  })
  .catch(err => {
    console.log('Error', err);
    req.flash('error', 'Either email or password entered is incorrect. Please try again.');
    res.redirect('/auth/signup');
  })
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome back...',
  failureFlash: 'Either email or password entered is incorrect. Please try again.'
}));

router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success', 'Logging out. See you soon!');
  res.redirect('/');
});

module.exports = router;
