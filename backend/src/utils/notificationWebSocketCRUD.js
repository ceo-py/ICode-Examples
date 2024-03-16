const Comments = require("../DataBase/Models/comments");
const Notification = require("../DataBase/Models/notifications");
const { userConnections } = require("../websocketServer");
const filterUnique = require("./filterUnique");

const createNotification = async (commentId, userId) => {
  const notification = new Notification({
    commentId,
    userId,
  });
  await notification.save();
};

const sendMessageWSS = async ({
  taskId,
  userId,
  commentId,
  message,
  notifyUser,
}) => {
  const uniqueComments = filterUnique(await Comments.find({ taskId }));
  uniqueComments.forEach((c) => {
    const userIdNotification = c.createdById.toString();
    if (userIdNotification !== userId) {
      if (notifyUser) createNotification(commentId, userIdNotification);
      const currentUser = userConnections.get(c.createdById.toString());
      currentUser?.send(message);
    }
  });
};

module.exports = sendMessageWSS;
