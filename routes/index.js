var express = require('express');
var router = express.Router();
const passport = require('passport');

// Import controllers
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

global.currentUser = '';

/* GET home page. */
router.get('/', messageController.get_index);

router.get(
  '/sign-up',
  userController.isNotAuthenticated,
  userController.sign_up_get
);

router.post('/sign-up', userController.sign_up_post);

router.get(
  '/login',
  userController.isNotAuthenticated,
  userController.login_get
);

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Incorrect user or password',
  }),
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

// Log out user from current session
router.post('/log-out', userController.log_out_post);

// Take user to form where he can become a member
router.get(
  '/new-member',
  userController.isAuthenticated,
  userController.new_member_get
);

// Verify if passcode was correct and include user as member
router.post('/new-member', userController.new_member_post);

// Take user to page where he can submit a new message
router.get(
  '/new-message',
  userController.isAuthenticated,
  messageController.new_message_get
);

// Save message in db and display in the homepage
router.post('/new-message', messageController.new_message_post);

module.exports = router;
