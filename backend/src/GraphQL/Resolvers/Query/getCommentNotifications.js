const Comments = require("../../../DataBase/Models/comments");
const Notification = require("../../../DataBase/Models/notifications");
const jwt = require('jsonwebtoken');


const getCommentNotificationResolver = {
    Query: {
        getCommentNotification: async (_, { __ }, { req, ___ }) => {
            try {
                const cookieToken = req?.cookies?.token;
                if (!cookieToken) {
                    return {
                        status: {
                            message: 'JWT must be provided',
                            code: 400,
                        }
                    };
                }
                const { userId: id } = jwt.verify(cookieToken, process.env.SECRET_KEY);
                const foundNotifications = await Notification.find({userId: id});

                const results = [];

                for (const notification of foundNotifications) {
                    const {username: userName, text: content, taskId: taskId} = await Comments.findOne({ _id: notification.commentId })
                    results.push({
                        content: content,
                        isRead: notification.isRead,
                        taskId: taskId,
                        notificationId: notification._id,
                        user: {
                            name: userName,
                        }
                    })
                }

                return {
                    result: JSON.stringify(results),
                    status: {
                        code: 200,
                        message: "Successful Comment Notification"
                    }
                }
            } catch (e) {
                console.log('getCommentNotificationResolver:\n', e)
                return {
                    status: {
                        code: 500,
                        message: "Unsuccessful Comment Notification"
                    }
                }
            }
        },
    },
};

module.exports = getCommentNotificationResolver;
