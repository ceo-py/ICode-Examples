const jwt = require("jsonwebtoken");
const Comments = require("../../../DataBase/Models/comments");
const sendMessageWSS = require("../../../utils/notificationWebSocketCRUD");

const editCommentResolver = {
  Mutation: {
    editComment: async (_, { input }, { req, res }) => {
      const cookieToken = req?.cookies?.token;
      if (!input.id || !input.text) {
        return {
          code: 401,
          message: "Missing comment details",
        };
      }
      try {
        const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);
        const updatedUserDetail = await Comments.findOneAndUpdate(
          { _id: input.id },
          { $set: { text: input.text } },
          { new: true }
        );

        await sendMessageWSS({
          taskId: updatedUserDetail.taskId.toString(),
          userId: decoded.userId,
          commentId: updatedUserDetail._id,
          message: "Comment edited",
          notifyUser: false,
        });

        if (!updatedUserDetail) {
          return {
            message: "Error edit comment",
            code: 400,
          };
        }

        return {
          code: 200,
          message: "Edit comment successfully",
        };
      } catch (e) {
        console.error("Edit Comment", e);
        return {
          code: 401,
          message: "Edit comment unsuccessfully",
        };
      }
    },
  },
};

module.exports = editCommentResolver;
