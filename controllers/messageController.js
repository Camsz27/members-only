const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.new_member_get = function (req, res, next) {
  res.send('waddup baby');
};

exports.new_member_post = function (req, res, next) {
  res.send('wo adsf');
};
