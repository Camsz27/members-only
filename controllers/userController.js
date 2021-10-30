const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Set up passport local strategy (username, password)
// passport.use(
//   new LocalStrategy(function (username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       bcrypt.compare(password, user.password, (err, res) => {
//         if (err) {
//           return next(err);
//         }
//         if (res) {
//           return done(null, user);
//         } else {
//           return done(null, false, { message: 'Incorrect password' });
//         }
//       });
//       res.locals.currentUser = req.user;
//       return done(null, user);
//     });
//   })
// );

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// Show sign up form
exports.sign_up_get = function (req, res, next) {
  res.render('sign_up', { title: 'Sign up' });
};

// Validate if username and input meet the requirements, if successful create user and redirect to login
exports.sign_up_post = [
  body('username')
    .trim()
    .isAlpha()
    .withMessage('Only alpha characters are allowed')
    .isLength({ min: 4, max: 30 })
    .withMessage('Username has to be between 4 and 30 characters')
    .escape(),

  body('password')
    .isLength({ min: 7 })
    .withMessage('Password must have at least 7 characters')
    .custom((value, { req }) => value === req.body.confirmPassword)
    .withMessage('Passwords do not match'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('sign_up', {
        title: 'Sign up',
        username: req.body.username,
        errors: errors.array(),
      });
      return;
    }

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        res.render('error');
      }
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        admin: false,
        member: false,
      });

      user.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/login');
      });
    });
  },
];

// Render login page
exports.login_get = function (req, res, next) {
  res.render('login', { title: 'Login' });
};

// Check if input matches info in the database and allow access
exports.login_post = function (req, res, next) {
  res.send('attempted to login');
};
