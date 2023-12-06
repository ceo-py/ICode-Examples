const mongoose = require('mongoose');

const LoginTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
});

const LoginToken = mongoose.model('LoginToken', LoginTokenSchema, 'LoginTokens');

module.exports = LoginToken;