const TaskSolution = require("../../../DataBase/Models/taskSolutions");
const jwt = require('jsonwebtoken');



const getTaskDetailsForUpdateResolver = {
    Query: {
        getTaskDetailsForUpdate: async (_, { input }, { res, req }) => {
            try {
                const taskId = input.id
                const cookieToken = req?.cookies?.token;

                if (!cookieToken) {
                    return {
                        status: {
                            code: 401,
                            message: "These credentials do not authorize access"
                        }
                    }
                } else {
                    const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);
                    const findTask = await TaskSolution.findOne({ _id: taskId })
                    if (String(findTask.id) !== decoded.userId) {
                        return {
                            status: {
                                code: 401,
                                message: "These credentials do not authorize access"
                            }
                        }
                    }
                    return {
                        taskName: findTask.taskName,
                        language: "String",
                        course: "String",
                        module: "String",
                        videoLink: findTask.videoLink,
                        githubLink: findTask.githubLink,
                        status: {
                            code: 200,
                            message: "Successful Fetch Task"
                        }
                    }
                }

            } catch (e) {
                console.error('Error getTaskSingle', e)
                return {
                    status: {
                        code: 500,
                        message: "Unsuccessful Fetch Task"
                    }
                }
            }
        },
    },
};

module.exports = getTaskDetailsForUpdateResolver;
