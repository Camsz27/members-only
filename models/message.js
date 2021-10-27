const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const messageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  timeStamp: { type: Date, required: true },
});

module.exports = mongoose.model('Message', messageSchema);
