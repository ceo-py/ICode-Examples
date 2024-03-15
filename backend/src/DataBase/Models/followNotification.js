const mongoose = require('mongoose');

const followNotificationSchema = new mongoose.Schema({
    targetUserId: { type: String, required: true },
    usernameFollowing: { type: String, required: true },
    isRead: { type: Boolean, default: false },
});

const followNotification = mongoose.model('followNotification', followNotificationSchema, 'followNotifications');

module.exports = followNotification;
