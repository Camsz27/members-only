const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.get_index = function (req, res, next) {
  res.render('index', {
    title: 'Members Only',
    user: currentUser,
  });
};

exports.new_message_get = function (req, res, next) {
  res.render('message', { title: 'Create message', user: currentUser });
};

// Handle input, store message in db and redirect to homepage
exports.new_message_post = [
  body('title').trim().escape(),
  body('content').trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('message', {
        title: 'Create message',
        user: currentUser,
        errors: errors.array(),
      });
      return;
    }

    // Create message according to input
    const message = new Message({
      title: req.body.title,
      content: req.body.content,
      timeStamp: new Date(),
      author: currentUser._id,
    });

    message.save(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  },
];
