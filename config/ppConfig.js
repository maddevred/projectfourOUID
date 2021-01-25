const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

// Passport "serialize" your info and make it easier to login
passport.serializeUser((user, cb) => {
    cb(null, user.id)
});

// Passport "deserialize" is to take the id and look it up in DB
passport.deserializeUser((id, cb) => {
    db.user.findByPk(id)
    .then(user => {
        if (user) {
            cb(null, user);
        }
    })
    .catch(err => {
        console.log(err);
    })
});


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, cb) => {
    db.user.findOne({
        where: { email }
    })
    .then(user => {
        if (!user || !user.validPassword(password)) {
            // Why null inside cb
            cb(null, false);
        } else {
            cb(null, user);
        }
    })
    .catch(cb);
}));

module.exports = passport;