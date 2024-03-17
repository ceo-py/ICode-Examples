const jwt = require("jsonwebtoken");
const Likes = require("../../../DataBase/Models/likes");
const likeNotification = require("../../../DataBase/Models/likeNotification");
const { userConnections } = require("../../../websocketServer");
const TaskSolution = require("../../../DataBase/Models/taskSolutions");

const likeTaskResolver = {
  Mutation: {
    likeTask: async (_, { input }, { req, res }) => {
      const cookieToken = req?.cookies?.token;
      const taskId = input.id;

      if (!taskId) {
        return {
          code: 401,
          message: "Missing Like details",
        };
      }
      try {
        const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);
        const userId = decoded.userId;
        const taskLikes = await Likes.findOne({ id: taskId });
        const updateQuery = { id: taskId };
        const userIndex = taskLikes.likes.indexOf(userId);

        userIndex === -1
          ? (updateQuery.$addToSet = { likes: userId })
          : (updateQuery.$pull = { likes: userId });
        await Likes.updateOne({ id: taskId }, updateQuery);

        const { id: targetUserId, taskName } = await TaskSolution.findOne({
          _id: taskId,
        });

        if (userIndex < 0 && decoded.userId !== targetUserId.toString()) {
          const like = new likeNotification({
            targetUserId: targetUserId.toString(),
            taskName,
            usernameLiking: decoded.username,
            taskId,
          });
          await like.save();

          const likedUser = userConnections.get(targetUserId);
          likedUser?.send("Like");
        }

        return {
          code: 200,
          message: "Like request successful",
        };
      } catch (e) {
        console.error("Like tasks error:\n", e);
        return {
          code: 500,
          message: "Like request unsuccessful",
        };
      }
    },
  },
};

module.exports = likeTaskResolver;
