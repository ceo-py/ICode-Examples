const Comments = require("../../../DataBase/Models/comments");
const Notification = require("../../../DataBase/Models/notifications");
const jwt = require('jsonwebtoken');


const getCommentNotificationResolver = {
    Query: {
        getReport: async (_, { __ }, { req, ___ }) => {
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
                if (id !== process.env.ADMIN_USER) {
                    return {
                        status: {
                            code: 401,
                            message: "These credentials do not authorize access"
                        }
                    }
                }
                const foundNotifications = await Notification.find({userId: id});

                const results = [];

                for (const notification of foundNotifications) {
                    const user = await Comments.findOne({ _id: report.userIdReport })
                    let comment = {}
                    if (report.typeReport === "Comment") {
                        const commentFound = await Comments.findOne({ _id: report.idReportType })
                        comment = report.typeReport === "Comment" ? {
                            idTask: commentFound.taskId, content: commentFound.text
                        } : {}
                    }


                    results.push({
                        content: report.reportContent,
                        isRead: report.isRead,
                        taskId: report.idReportType,
                        reportId: report._id,
                        user: {
                            name: user.username,
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
