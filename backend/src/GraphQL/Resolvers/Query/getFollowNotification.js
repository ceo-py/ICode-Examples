const jwt = require("jsonwebtoken");
const followNotification = require("../../../DataBase/Models/followNotification");

const getFollowNotificationResolver = {
  Query: {
    getFollowNotification: async (_, { __ }, { req, ___ }) => {
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
        const { username: username } = jwt.verify(
          cookieToken,
          process.env.SECRET_KEY
        );

        const notifications = await followNotification
          .find({ username })
          .sort({ _id: -1 });

        const results = notifications.map((n) => ({
          follower: n.usernameFollowing,
          isRead: n.isRead,
        }));

        return {
          result: JSON.stringify(results),
          status: {
            code: 200,
            message: "Successful Follow Notification",
          },
        };
      } catch (e) {
        console.log("getFollowNotificationResolver:\n", e);
        return {
          status: {
            code: 500,
            message: "Unsuccessful Follow Notification",
          },
        };
      }
    },
  },
};

module.exports = getFollowNotificationResolver;
