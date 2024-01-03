const mongoose = require('mongoose');

const PasswordResetSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  // createdAt: { type: Date, expires: 10 }
  // createdAt: { type: Date, default: Date.now, expires: 1 }
  expiresAt: { type: Date, default: Date.now, index: { expires: '1m' } },
});

const PasswordResetToken = mongoose.model('PasswordResetToken', PasswordResetSchema, 'PasswordResetTokens');

module.exports = PasswordResetToken;