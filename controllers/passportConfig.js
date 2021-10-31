const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

async function initialize(passport) {
  const authenticateUser = (username, password, done) => {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      try {
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) {
            return next(err);
          }
          if (res) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password' });
          }
        });
      } catch (error) {
        return done(error);
      }
    });
  };
  passport.use(new LocalStrategy(authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, User.findById(id)));
}

module.exports = initialize;
