const mongoose = require('mongoose');

const userDetailSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  email: { type: String, default: '' },
  icon: { type: String, default: 'https://www.svgrepo.com/show/418032/user.svg' },
  youtube: { type: String, default: '' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  about: { type: String, default: '' },
});

const UserDetail = mongoose.model('UserDetail', userDetailSchema, 'UsersDetails');

module.exports = UserDetail;
