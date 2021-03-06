const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
  member: { type: Boolean, required: true },
});

module.exports = mongoose.model('User', userSchema);
