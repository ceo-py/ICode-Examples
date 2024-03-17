const { WebSocketServer } = require("ws");
const jwt = require("jsonwebtoken");
const Reports = require("./DataBase/Models/reports");
const Notification = require("./DataBase/Models/notifications");
const { parse } = require("cookie");
const followNotification = require("./DataBase/Models/followNotification");
const likeNotification = require("./DataBase/Models/likeNotification");

const wss = new WebSocketServer({ port: 5001 });
const userConnections = new Map();

const updateNotification = async (model, id, update) => {
  try {
    await model.findByIdAndUpdate(id, { $set: update });
  } catch (error) {
    console.log(`${model.modelName}:\n`, error);
  }
};

const deleteNotification = async (model, id) => {
  try {
    await model.deleteOne({ _id: id });
  } catch (error) {
    console.log(`delete${model.modelName}:\n`, error);
  }
};

const commands = {
  deleteReport: async (reportId) => deleteNotification(Reports, reportId),
  makeReadReport: async (reportId) =>
    updateNotification(Reports, reportId, { isRead: true }),
  makeReadComment: async (commentId) =>
    updateNotification(Notification, commentId, { isRead: true }),
  deleteComment: async (commentId) =>
    deleteNotification(Notification, commentId),
  makeReadFollow: async (followId) =>
    updateNotification(followNotification, followId, { isRead: true }),
  deleteFollow: async (followId) =>
    deleteNotification(followNotification, followId),
  makeReadLike: async (likeId) =>
    updateNotification(likeNotification, likeId, { isRead: true }),
  deleteLike: async (likeId) => deleteNotification(likeNotification, likeId),
};

wss.on("connection", async (ws, req) => {
  try {
    const userId = jwt.verify(
      parse(req?.headers?.cookie).token,
      process.env.SECRET_KEY
    ).userId;

    if (!userId) {
      console.error("User ID not found in the cookie");
      ws.close();
      return;
    }

    userConnections.set(userId, ws);
    ws.on("message", (message) => {
      const [command, userId] = JSON.parse(message).split(" ");
      if (commands.hasOwnProperty(command)) commands[command](userId);

      console.log(`Received message from user ${userId}:`, JSON.parse(message));
      if (command.includes("Report")) ws.send("Report");
      if (command.includes("Comment")) ws.send("Comment");
      if (command.includes("Follow")) ws.send("Follow");
      if (command.includes("Like")) ws.send("Like");
    });

    ws.on("close", () => {
      console.log(`User ${userId} disconnected`);
      userConnections.delete(userId);
    });
  } catch (e) {
    console.log("WebSocketServer:\n", e);
  }
  return {
    message: "Internal server error",
    code: 500,
  };
});

module.exports = { wss, userConnections };
