const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  address: String,
  billingAddress: String
});

module.exports = mongoose.model('User', userSchema);