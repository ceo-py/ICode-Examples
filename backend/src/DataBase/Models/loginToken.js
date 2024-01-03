const mongoose = require('mongoose');

const PasswordResetSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, default: Date.now, index: { expires: '1380m' } },
});

const PasswordResetToken = mongoose.model('PasswordResetToken', PasswordResetSchema, 'PasswordResetTokens');

module.exports = PasswordResetToken;