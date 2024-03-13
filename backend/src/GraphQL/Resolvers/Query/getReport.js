const Comments = require("../../../DataBase/Models/comments");
const Reports = require("../../../DataBase/Models/reports");
const Users = require('../../../DataBase/Models/users')
const jwt = require('jsonwebtoken');


const getReportResolver = {
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
                const foundReports = await Reports.find({
                    typeReport: { $in: ["TaskSolution", "Comment"] }
                }).sort({ _id: -1 });

                const results = [];

                for (const report of foundReports) {
                    const user = await Users.findOne({ _id: report.userIdReport })
                    let comment = {}
                    if (report.typeReport === "Comment") {
                        const commentFound = await Comments.findOne({ _id: report.idReportType })
                        comment = report.typeReport === "Comment" ? {
                            idTask: commentFound.taskId, content: commentFound.text
                        } : {}
                    }
                    
                    let reportResult = {
                        content: report.reportContent,
                        isRead: report.isRead,
                        taskId: report.idReportType,
                        reportId: report._id,
                        reportType: report.typeReport,
                        user: {
                            name: user.username,
                        }
                    }
                    if (Object.values(comment).length !== 0) reportResult = { ...reportResult, comment }
                    results.push(reportResult)
                }

                return {
                    result: JSON.stringify(results),
                    status: {
                        code: 200,
                        message: "Successful Report"
                    }
                }
            } catch (e) {
                console.log('getReportResolver:\n', e)
                return {
                    status: {
                        code: 500,
                        message: "Unsuccessful Report"
                    }
                }
            }
        },
    },
};

module.exports = getReportResolver;
