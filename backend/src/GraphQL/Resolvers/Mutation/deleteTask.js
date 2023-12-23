const TaskSolution = require("../../../DataBase/Models/taskSolutions");
const jwt = require('jsonwebtoken');


const deleteTaskResolver = {
    Mutation: {
        deleteUser: async (_, { input }, { req, res }) => {
            const cookieToken = req?.cookies?.token;

            if (!cookieToken) {
                return {
                    message: 'Error JWT must be provided',
                    code: 401,
                };
            }
            try {
                const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);
                const id = decoded.userId
                const foundTask = new TaskSolution.findOne({ _id: input.id, id })
                console.log(foundTask)
                // await Followers.deleteOne({ id });

                if (!foundTask) {
                    return {
                        message: 'Error deleting task',
                        code: 400,
                    };
                }
                return {
                    message: 'Task Successfully Deleted',
                    code: 200,
                };
            } catch (error) {
                console.error('Error deleting task', error);
                return {
                    message: 'Error deleting task',
                    code: 500,
                };
            }
        },
    },
};


module.exports = deleteTaskResolver;
