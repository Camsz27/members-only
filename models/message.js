const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  timeStamp: { type: Date, required: true },
  author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Message', messageSchema);
