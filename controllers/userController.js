const User = require('../models/user');

exports.sign_up_get = function (req, res, next) {
  res.render('sign_up', { title: 'Sign up' });
};

exports.sign_up_post = function (req, res, next) {
  res.send('back on track');
};

exports.login_get = function (req, res, next) {
  res.render('login', { title: 'Login' });
};

exports.login_post = function (req, res, next) {
  res.send('login post');
};
