const jwt = require('jsonwebtoken');
const TaskSolution = require('../../../DataBase/Models/taskSolutions');

const uploadTaskResolver = {
    Mutation: {
        uploadTask: async (_, { input }, { req, res }) => {
            const cookieToken = req?.cookies?.token;

            if (!cookieToken) {
                return {
                    message: 'JWT must be provided',
                    code: 400,
                };
            }
            try {
                const { userId: id } = jwt.verify(cookieToken, process.env.SECRET_KEY);
                const task = new TaskSolution({ id, ...input } );
                await task.save();

                if (!task) {
                    return {
                        message: 'Error creating task',
                        code: 400,
                    };
                }
                return {
                    message: 'Task was created successfully',
                    code: 200,
                };
            } catch (error) {
                console.error('Error creating task:', error);
                return {
                    message: 'Error creating task',
                    code: 500,
                };
            }
        },
    },
};

module.exports = uploadTaskResolver;