var express = require('express');
var router = express.Router();
const passport = require('passport');

// Import controllers
const userController = require('../controllers/userController');

global.currentUser = '';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Members Only',
    user: currentUser,
  });
});

router.get('/sign-up', userController.sign_up_get);

router.post('/sign-up', userController.sign_up_post);

router.get('/login', userController.login_get);

router.post(
  '/login',
  passport.authenticate('local'),
  function (req, res, next) {
    try {
      global.currentUser = req.user;
      req.logIn(req.user, (err) => {
        if (err) {
          res.render('/login', { error: err });
          return next(err);
        }
      });
      res.redirect('/');
    } catch (error) {
      return error;
    }
  }
);

router.post('/log-out', userController.log_out_post);

router.get('/new-member', userController.new_member_get);

router.post('/new-member', userController.new_member_post);

module.exports = router;
