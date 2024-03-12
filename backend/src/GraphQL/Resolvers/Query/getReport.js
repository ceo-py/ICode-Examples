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
                const foundReports = await Reports.find({ typeReport: "TaskSolution" }).sort({ _id: -1 })

                const results = [];

                for (const report of foundReports) {
                    const user = await Users.findOne({ _id: report.userIdReport })
                    results.push({
                        content: report.reportContent,
                        isRead: report.isRead,
                        taskId: report.idReportType,
                        user: {
                            id: user._id,
                            name: user.username,
                        }
                    })
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
