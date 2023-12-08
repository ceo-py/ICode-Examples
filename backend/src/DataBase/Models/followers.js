const mongoose = require('mongoose');

const followersSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
});

const Followers = mongoose.model('follower', followersSchema, 'Followers');

module.exports = Followers;
