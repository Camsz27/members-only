const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.sign_up_get = function (req, res, next) {
  res.render('sign_up', { title: 'Sign up' });
};

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
        res.redirect('/login', { title: 'Login' });
      });
    });
  },
];

exports.login_get = function (req, res, next) {
  res.render('login', { title: 'Login' });
};

exports.login_post = function (req, res, next) {
  res.send('login post');
};
