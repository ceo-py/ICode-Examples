const Reports = require("../../../DataBase/Models/reports");
const TaskSolution = require("../../../DataBase/Models/taskSolutions");


const getReportResolver = {
    Query: {
        getReport: async (_, { __ }, { req, ___ }) => {
            try {
                // const cookieToken = req?.cookies?.token;

                // if (!cookieToken) {
                //     return {
                //         message: 'JWT must be provided',
                //         code: 400,
                //     };
                // }
                // const { userId: id } = jwt.verify(cookieToken, process.env.SECRET_KEY);
                // if (id !== process.env.ADMIN_USER) {
                //     return {
                //         status: {
                //             code: 401,
                //             message: "These credentials do not authorize access"
                //         }
                //     }
                // }
                const result = await Reports.find({})
                console.log(result);
                return {
                    result: JSON.stringify(result),
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
