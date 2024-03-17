const mongoose = require("mongoose");

const likeNotificationSchema = new mongoose.Schema({
  targetUserId: { type: String, required: true },
  usernameLiking: { type: String, required: true },
  taskId: { type: String, required: true },
  isRead: { type: Boolean, default: false },
});

const likeNotification = mongoose.model(
  "likeNotification",
  likeNotificationSchema,
  "likeNotifications"
);

module.exports = likeNotification;
