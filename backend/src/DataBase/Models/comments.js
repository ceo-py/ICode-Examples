const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'TaskSolution', required: true },
    createdById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

commentsSchema.pre('save', function (next) {
    const now = new Date();
    this.updatedAt = now;

    if (!this.createdAt) {
        this.createdAt = now;
    }

    next();
});

commentsSchema.pre('updateOne', function (next) {
    const now = new Date();
    this.updatedAt = now;

    next();
});

commentsSchema.pre('findOneAndUpdate', function (next) {
    const now = new Date();
    this._update.updatedAt = now;

    next();
});

const Comments = mongoose.model('comment', commentsSchema, 'Comments');

module.exports = Comments;
