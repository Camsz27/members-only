var express = require('express');
var router = express.Router();

// Import controllers
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Members Only' });
});

router.get('/sign-up', userController.sign_up_get);

router.post('/sign-up', userController.sign_up_post);

router.get('/login', userController.login_get);

router.post('/login', userController.login_post);

module.exports = router;
