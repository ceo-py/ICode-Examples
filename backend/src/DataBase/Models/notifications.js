const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    commentId: { type: String, ref: 'Comments', required: true },
    userId: { type: String, required: true },
    isRead: { type: Boolean, default: false },
});

const Notification = mongoose.model('Notification', NotificationSchema, 'Notification');

module.exports = Notification;