const mongoose = require('mongoose');

const followNotificationSchema = new mongoose.Schema({
    taskId: { type: String, required: true },
    username: { type: String, required: true },
    isRead: { type: Boolean, default: false },
});

const followNotification = mongoose.model('followNotification', followNotification, 'followNotifications');

module.exports = followNotification;
