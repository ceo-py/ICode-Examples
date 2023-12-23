const jwt = require('jsonwebtoken');
const TaskSolution = require('../../../DataBase/Models/taskSolutions');


const updateTaskResolver = {
    Mutation: {
        updateTask: async (_, { input }, { req, res }) => {
            const cookieToken = req?.cookies?.token;

            if (!cookieToken) {
                return {
                    message: 'Error JWT must be provided',
                    code: 400,
                };
            }
            try {
                const { userId: id } = jwt.verify(cookieToken, process.env.SECRET_KEY);
                const updatedTask = await TaskSolution.findOneAndUpdate({ _id: input.taskId, id }, { $set: input }, { new: true });

                if (!updatedTask) {
                    return {
                        message: 'Error updating task details',
                        code: 400,
                    };
                }
                return {
                    message: 'Task details updated successfully',
                    code: 200,
                };
            } catch (error) {
                console.error('Error updating task details:', error);
                return {
                    message: 'Error updating task details',
                    code: 500,
                };
            }
        },
    },
};

module.exports = updateTaskResolver;
