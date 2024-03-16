const jwt = require("jsonwebtoken");
const Comments = require("../../../DataBase/Models/comments");
const sendMessageWSS = require("../../../utils/notificationWebSocketCRUD");

const deleteCommentResolver = {
  Mutation: {
    deleteComment: async (_, { input }, { req, res }) => {
      const cookieToken = req?.cookies?.token;
      if (!input.id) {
        return {
          status: {
            code: 401,
            message: "Missing comment details",
          },
        };
      }
      try {
        const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);
        const comment = await Comments.findOne({ _id: input.id });
        await sendMessageWSS({
          taskId: comment.taskId.toString(),
          userId: decoded.userId,
          commentId: comment._id,
          message: "Comment deleted",
          notifyUser: false,
        });

        await Comments.deleteOne({ _id: comment._id });

        return {
          code: 200,
          message: "Delete comment successfully",
        };
      } catch (e) {
        console.error("Error on delete Comment", e);
        return {
          code: 401,
          message: "Delete comment unsuccessfully",
        };
      }
    },
  },
};

module.exports = deleteCommentResolver;
