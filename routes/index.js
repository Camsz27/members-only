var express = require('express');
var router = express.Router();
const passport = require('passport');

// Import controllers
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Members Only', user: req.user.username });
});

router.get('/sign-up', userController.sign_up_get);

router.post('/sign-up', userController.sign_up_post);

router.get('/login', userController.login_get);

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    try {
      console.log(req.user);
    } catch (error) {
      console.log('what is dat');
      console.log(error);
    }
    res.render('index', { title: 'Members Only', user: req.user.username });
  }
);

module.exports = router;
