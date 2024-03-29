const jwt = require("jsonwebtoken");
const Comments = require("../../../DataBase/Models/comments");
const UserDetail = require("../../../DataBase/Models/userDetails");
const sendMessageWSS = require("../../../utils/notificationWebSocketCRUD");

const createCommentResolver = {
  Mutation: {
    createComment: async (_, { input }, { req, res }) => {
      const cookieToken = req?.cookies?.token;
      if (!input.id || !input.text) {
        return {
          status: {
            code: 401,
            message: "Missing comment details",
          },
        };
      }
      try {
        const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);
        const user = await UserDetail.findOne({ id: decoded.userId });
        const comment = new Comments({
          taskId: input.id,
          createdById: decoded.userId,
          username: decoded.username,
          text: input.text.trim(),
        });
        await comment.save();

        await sendMessageWSS({
          taskId: input.id,
          userId: decoded.userId,
          commentId: comment._id,
          message: "Comment created",
          notifyUser: true,
        });

        return {
          status: {
            code: 200,
            message: "Create comment successfully",
          },

          commentDetails: JSON.stringify({
            timePast: `1 second ago`,
            username: decoded.username,
            createdById: decoded.userId,
            commentId: comment._id,
            text: comment.text,
            icon: user.icon,
          }),
        };
      } catch (e) {
        console.log("Create comment error:\n", e);
        return {
          status: {
            code: 401,
            message: "Create comment unsuccessfully",
          },
        };
      }
    },
  },
};

module.exports = createCommentResolver;
