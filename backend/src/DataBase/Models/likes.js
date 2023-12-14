const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'TaskSolution', required: true, unique: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
});

const Likes = mongoose.model('like', likesSchema, 'Likes');

module.exports = Likes;
