var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Members Only' });
});

router.get('/sign-up', function (req, res, next) {
  res.render('sign_up', { title: 'Sign up' });
});

module.exports = router;
