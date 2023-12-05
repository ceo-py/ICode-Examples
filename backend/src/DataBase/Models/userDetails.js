const mongoose = require('mongoose');

const userDetailSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, default: '' },
  icon: { type: String, default: '' },
  youtube: { type: String, default: '' },
  github: { type: String, default: '' },
  about: { type: String, default: '' },
});

const UserDetail = mongoose.model('UserDetail', userDetailSchema, 'UsersDetails');

module.exports = UserDetail;