const jwt = require("jsonwebtoken");
const likeNotification = require("../../../DataBase/Models/likeNotification");

const getLikeNotificationResolver = {
  Query: {
    getLikeNotification: async (_, { __ }, { req, ___ }) => {
      try {
        const cookieToken = req?.cookies?.token;
        if (!cookieToken) {
          return {
            status: {
              message: "JWT must be provided",
              code: 400,
            },
          };
        }
        const { userId } = jwt.verify(cookieToken, process.env.SECRET_KEY);

        const likes = await likeNotification
          .find({ targetUserId: userId })
          .sort({ _id: -1 });

        const results = likes.map((l) => ({
          taskId: l.taskId,
          taskName: l.taskName,
          likeId: l._id,
          liker: l.usernameLiking,
          isRead: l.isRead,
        }));

        return {
          result: JSON.stringify(results),
          status: {
            code: 200,
            message: "Successful Like Notification",
          },
        };
      } catch (e) {
        console.log("getLikeNotificationResolver:\n", e);
        return {
          status: {
            code: 500,
            message: "Unsuccessful Like Notification",
          },
        };
      }
    },
  },
};

module.exports = getLikeNotificationResolver;
